import { FetchOptions } from "@auth0/auth0-spa-js";

const API_URL = "http://localhost:5000";

const useApi = (token: string) => {
    const options = (method: string): RequestInit => ({
        method: method,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return {
        get: (path: string) => fetch(path, options("GET")),
        post: (path: string) => fetch(path, options("POST")),
        put: (path: string) => fetch(path, options("PUT")),
        delete: (path: string) => fetch(path, options("DELETE")),
    };
}