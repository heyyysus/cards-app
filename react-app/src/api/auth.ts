import { api } from "./api"
import { IUser } from "./models/IUser";

export const getLocalUser = async (token: string): Promise<IUser | null> => {
    const { get } = api(token);
    const response = await get('auth')
    if(response.ok){
        const body = await response.json();
        return body;
    } else {
        return null;
    }
}