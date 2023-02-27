import { IUser } from ".";
import db from "../util/db";
import crypto from "crypto";

export class UsernameAlreadyExistsError extends Error {};

export const fetchOneBy = async (key: string, value: string, fields: string[] = ['*']): Promise<IUser> => {
    try {
        const fieldsString: string = fields.reduce((a, b) => `${a}, ${b}`);
        const query = {
            text: `SELECT ${fieldsString} FROM users WHERE ${key}=$1`,
            values: [value]
        };
        const result = await db.query(query);
        return result.rows.at(0);
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
            text: `INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *`,
            values: [newUser.email, newUser.username]
        }
        const insertResult = await db.query(insertQuery);
        return insertResult.rows.at(0);
    } catch(e){
        console.log(e);
        return null;
    }
}

export const createWithAutoUsername = async (email: string): Promise<IUser> => {
    let username = "";
    do {
        username = `user_${crypto.randomInt(100000000)}`;
    } while (await fetchOneBy('username', username, ['user_id']))
    const newUser: IUser = {
        user_id: 0,
        email: email,
        username: username
    };
    return await create(newUser);
}

export const getOrCreateByEmail = async (email: string): Promise<IUser> => {
    const existingUser = await fetchOneBy('email', email, ['*']);
    console.log(existingUser);
    if(existingUser) return existingUser;
    else return await createWithAutoUsername(email);
}