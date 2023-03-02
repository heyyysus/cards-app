import { FetchOptions } from "@auth0/auth0-spa-js";
import config from "../config.json";

const API_URL = config.API_URL;

export const api = (token: string) => {
    const options = (method: string): RequestInit => ({
        method: method,
        credentials: 'include',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return {
        get: async (path: string) => fetch(`${API_URL}/${path}`, options("GET")),
        post: (path: string) => fetch(`${API_URL}/${path}`, options("POST")),
        put: (path: string) => fetch(`${API_URL}/${path}`, options("PUT")),
        delete: (path: string) => fetch(`${API_URL}/${path}`, options("DELETE")),
    };
}