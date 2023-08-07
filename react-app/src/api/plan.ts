import { api } from "./api"
import { IPlan } from "./models/IPlan";

export const getAllPlans = async (token: string): Promise<IPlan[]> => {
    try {
        const { get } = api<IPlan>(token);
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

export const getPlan = async (token: string, id: string): Promise<IPlan | null> => {
    try {
        const { get } = api<IPlan>(token);
        const response = await get(`plan/${id}`);
        if(response.ok){
            return response.json();
        } else {
            console.log(response)
            return null;
        }
    } catch (e) {
        console.log(e)
        return null;
    }
}

export const createPlan = async (token: string, plan: IPlan): Promise<IPlan | null> => {
    try {
        const { post } = api<IPlan>(token);
        const response = await post(`plan`, plan);
        if(response.ok){
            return response.json();
        } else {
            console.log(response)
            return null;
        }
    } catch (e) {
        console.log(e)
        return null;
    }
}