import { resolve } from "path";
import { api } from "./api";

export interface ImageUploadUrl {
    url: string,
    filename: string
};

export const getProfileImageUploadUrl = async (token: string, ext: string): Promise<ImageUploadUrl | null> => {
    try {
        const { get } = api(token);
        const response = await get(`getImageUploadUrl?extension=${ext}`);
        if(response.ok){
            const body: ImageUploadUrl = await response.json();
            return body;
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const uploadProfileImageFile = async (token: string, file: File): Promise<string | null> => {
    const name_split = file.name.split('.');
    const ext = name_split[name_split.length - 1]
    try {
        const { url, filename } = (await getProfileImageUploadUrl(token, ext)) || {};
        if(!url) return null;

        const response = await fetch(
            url,
            {
             method: "PUT",
             mode: 'cors',
             body: file,
             headers: {
              "Content-type": file.type
             }
            }
        );

        if(response.ok) return filename || null;
        return null;
        
    } catch (e) {
        console.log(e);
        return null;
    }
}