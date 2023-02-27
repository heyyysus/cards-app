import { FetchOptions } from "@auth0/auth0-spa-js";

const API_URL = "http://localhost:5000/api";

export const api = (token: string) => {
    const options = (method: string): RequestInit => ({
        method: method,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return {
        get: async (path: string) => fetch(`${API_URL}/${path}`, options("GET")),
        post: (path: string) => fetch(`${API_URL}/${path}`, options("POST")),
        put: (path: string) => fetch(`${API_URL}/${path}`, options("PUT")),
        delete: (path: string) => fetch(`${API_URL}/${path}`, options("DELETE")),
    };
}