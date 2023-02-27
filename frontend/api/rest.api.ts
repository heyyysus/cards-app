import * as SecureStore from "expo-secure-store";

const generateConfig = async (method: string = "GET"): Promise<RequestInit> => {
    try{
        const access_token = await SecureStore.getItemAsync('access_token');
        return {
            method: method,
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        };
    } catch(e) {
        console.log(e);
        return null;
    }
}

// const Post = <T>(): Promise<T> => {

// }

export {};