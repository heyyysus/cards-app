import { Request, Response, NextFunction } from "express";
import * as UserService from "../user/user.service";

const TOKEN_INFO_API = "https://oauth2.googleapis.com/tokeninfo";

export const RequireAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const token_api_call = await fetch(`${TOKEN_INFO_API}?access_token=${token}`, {
            method: "GET",
        });
        //console.log(await token_api_call.json());
        if(token_api_call.ok) {
            const google_token_response = await token_api_call.json();
            
            if(google_token_response.email_verified){
                req.user = await UserService.getOrCreateByEmail(google_token_response.email);
                next()
            } else {
                res.status(403).send();
            }
        }
        else res.status(401).send();
    } catch(e) {
        console.log(e)
        res.status(400).send();
    }
}