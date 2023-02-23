
const API_URL = "http://192.168.0.212:5000/api";

export interface IUser {
    email: string
};

export const get_local_user = async (access_token?: string): Promise<IUser | null> => {
    if(!access_token) return null;
    try {
        const response = await fetch(`${API_URL}/auth/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });
        if(response.ok)
            return await response.json();
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}