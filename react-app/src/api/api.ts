import { FetchOptions } from "@auth0/auth0-spa-js";
import { json } from "stream/consumers";
import config from "../config.json";
import { IUser } from "./models/IUser";

const API_URL = config.API_URL;

export const api = (token: string) => {
    const options = (method: string, body?: IUser): RequestInit => ({
        method: method,
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });
    return {
        get: async (path: string, body?: IUser) => fetch(`${API_URL}/${path}`, options("GET", body)),
        post: (path: string, body?: IUser) => fetch(`${API_URL}/${path}`, options("POST", body)),
        patch: (path: string, body?: IUser) => fetch(`${API_URL}/${path}`, options("PATCH", body)),
        delete: (path: string, body?: IUser) => fetch(`${API_URL}/${path}`, options("DELETE", body)),
    };
}