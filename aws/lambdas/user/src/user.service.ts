
import db from "./db";
import crypto from "crypto";
import { QueryResult } from "pg";

export interface IUser {
    user_id: string,
    username?: string,
    profile_img?: string,
    ts?: Date
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
    try {
        const fieldsString: string = fields.reduce((a, b) => `${a}, ${b}`);
        const query = {
            text: `SELECT ${fieldsString} FROM users WHERE ${key}=$1`,
            values: [value]
        };
        const result = await db.query(query);
        return result.rows[0];
    } catch(e){
        console.log(e);
        return null;
    }
}

export const create = async (newUser: IUser): Promise<IUser> => {
    const usernameCheck = await fetchOneBy('username', newUser.username, ['user_id'])
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
    } while (await fetchOneBy('username', username, ['user_id']))
    const newUser: IUser = {
        user_id: id,
        username: username
    };
    return await create(newUser);
}

export const getOrCreateByUserId = async (id: string): Promise<IUser> => {
    const existingUser = await fetchOneBy('user_id', id, ['*']);
    console.log(existingUser);
    if(existingUser) return existingUser;
    else return await createWithAutoUsername(id);
}

export const patchUser = async (updatedUser: IUser): Promise<any> => {
    try {
        const query = `UPDATE users SET username=$1, profile_img=$2 WHERE user_id=$3 RETURNING *`;
        const result = await db.query(query, [updatedUser.username, updatedUser.profile_img, updatedUser.user_id]);
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