import { api } from "./api"
import { IPlan } from "./models/IPlan";

export const getAllPlans = async (token: string): Promise<IPlan[]> => {
    try {
        const { get } = api(token);
        const response = await get('plan');
        if(response.ok){
            return response.json();
        } else {
            console.log(response)
            return [];
        }
    } catch (e) {
        console.log(e)
        return [];
    }
}