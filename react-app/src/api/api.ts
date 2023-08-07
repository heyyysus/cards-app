import { FetchOptions } from "@auth0/auth0-spa-js";
import { json } from "stream/consumers";
import config from "../config.json";
import { IUser } from "./models/IUser";

const API_URL = config.API_URL;

// api function that returns a set of functions that can be used to make requests to the API
// uses the token to authenticate the user
// body takes generic type 

export const api = <BodyType>(token: string) => {
    const options = (method: string, body?: BodyType): RequestInit => ({
        method: method,
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    });
    return {
        get: async (path: string, body?: BodyType) => fetch(`${API_URL}/${path}`, options("GET", body)),
        post: (path: string, body?: BodyType) => fetch(`${API_URL}/${path}`, options("POST", body)),
        patch: (path: string, body?: BodyType) => fetch(`${API_URL}/${path}`, options("PATCH", body)),
        delete: (path: string, body?: BodyType) => fetch(`${API_URL}/${path}`, options("DELETE", body)),
    };
}