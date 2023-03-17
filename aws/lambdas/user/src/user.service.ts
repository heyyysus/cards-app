
import db from "./db";
import crypto from "crypto";
import { QueryResult } from "pg";
import pool from "./db";

export interface IUser {
    user_id: string,
    username?: string,
    profile_img?: string,
    bio?: string,
    ts?: Date
    following?: IUser[],
    followers?: IUser[],
}

export interface IPlan {
    plan_id: number,
    plan_name?: string,
    plan_description?: string,
    ts?: Date,
    user: IUser,
};

export class UsernameAlreadyExistsError extends Error {};

export const fetchOneBy = async (key: string, value: string, fields: string[] = ['*']): Promise<IUser> => {
    const fieldsString: string = fields.reduce((a, b) => `${a}, ${b}`);
    try {
        const query = {
            text: `SELECT ${fieldsString} FROM users WHERE ${key}=$1`,
            values: [value]
        };
        const result = await db.query(query);
        let fetchedUser: IUser = result.rows[0];
        if (!fetchedUser) return null;
        fetchedUser.followers = await fetchFollowers(fetchedUser.user_id);
        fetchedUser.following = await fetchFollowing(fetchedUser.user_id);
        return fetchedUser;
    } catch(e){
        console.log(e);
        return e;
    }
}

export const fetchAll = async (fields: string[] = ['*']): Promise<IUser[]> => {
    const fieldsString: string = fields.reduce((a, b) => `${a}, ${b}`);
    try {
        const query = `SELECT ${fieldsString} FROM users`
        const result = await db.query(query);
        return result.rows;
    } catch(e){
        console.log(e);
        return e;
    }
}

export const fetchFollowers = async (user_id: string): Promise<IUser[]> => {
    try {
        const query = {
            text: `SELECT u.user_id, u.username, u.bio, u.profile_img, u.ts 
                    FROM users_following_users AS f INNER JOIN users AS u 
                    ON u.user_id=f.fk_follower WHERE fk_following=$1`,
            values: [user_id]
        };
        const result = await pool.query(query);
        return result.rows;
    } catch(e) {
        console.log(e);
        return e;
    }
}

export const fetchFollowing = async (user_id: string): Promise<IUser[]> => {
    try {
        const query = {
            text: `SELECT u.user_id, u.username, u.bio, u.profile_img, u.ts 
                    FROM users_following_users AS f INNER JOIN users AS u 
                    ON u.user_id=f.fk_following WHERE fk_follower=$1`,
            values: [user_id]
        };
        const result = await pool.query(query);
        return result.rows;
    } catch(e) {
        console.log(e);
        return e;
    }
}

export const actOnUser  = async (user_id: string, sub: string, action: 'follow' | 'unfollow'): Promise<IUser> => {
    try {
        if(action === 'follow'){
            const checkFollowQuery = {
                text: `SELECT * FROM users_following_users WHERE fk_follower=$1 AND fk_following=$2`,
                values: [sub, user_id]
            };
            const checkFollowResult = await pool.query(checkFollowQuery);
            if(checkFollowResult.rowCount === 0){
                const insertFollowQuery = {
                    text: `INSERT INTO users_following_users (fk_follower, fk_following) VALUES ($1, $2)`,
                    values: [sub, user_id],
                };
                await pool.query(insertFollowQuery);
            }
            return await fetchOneBy('user_id', user_id);
        } else if (action === 'unfollow') {
            const query = {
                text: `DELETE FROM users_following_users WHERE fk_follower=$1 AND fk_following=$2`,
                values: [sub, user_id]
            }
            await pool.query(query);
            return await fetchOneBy('user_id', user_id);
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const create = async (newUser: IUser): Promise<IUser> => {
    const usernameCheck = await fetchOneBy('username', newUser.username)
    if(usernameCheck) throw new UsernameAlreadyExistsError;
    try {
        const insertQuery = {
            text: `INSERT INTO users (user_id, username) VALUES ($1, $2) RETURNING *`,
            values: [newUser.user_id, newUser.username]
        }
        const insertResult = await db.query(insertQuery);
        return insertResult.rows[0];
    } catch(e){
        console.log(e);
        return null;
    }
}

export const createWithAutoUsername = async (id: string): Promise<IUser> => {
    let username = "";
    do {
        username = `user_${crypto.randomInt(100000000)}`;
    } while (await fetchOneBy('username', username))
    const newUser: IUser = {
        user_id: id,
        username: username
    };
    return await create(newUser);
}

export const getOrCreateByUserId = async (id: string): Promise<IUser> => {
    const existingUser = await fetchOneBy('user_id', id);
    console.log(existingUser);
    if(existingUser) return existingUser;
    else return await createWithAutoUsername(id);
}

export const patchUser = async (updatedUser: IUser): Promise<any> => {
    try {
        const query = `UPDATE users SET username=$1, profile_img=$2, bio=$3 WHERE user_id=$4 RETURNING *`;
        const result = await db.query(query, [
            updatedUser.username, 
            updatedUser.profile_img, 
            updatedUser.bio || null,  
            updatedUser.user_id
        ]);
        return result.rows[0] || result;
    } catch(e){
        console.log(e);
        return e;
    }
}

export const getUserPlans = async (id: string): Promise<IPlan[]> => {
    try {
        const query = `SELECT plan_id, plan_name, plan_description, user_id, ts FROM events 
                        WHERE user_id=$1`;
        const result = await db.query(query, [id]);
        return result.rows;
    } catch(e){
        console.log(e);
        return null;
    }
}