import { Request, Response, NextFunction } from "express";
import * as UserService from "../user/user.service";

const TOKEN_INFO_API = "https://oauth2.googleapis.com/tokeninfo";

export const RetrieveAuthUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sub = req.auth.payload.sub;
        const user = await UserService.getOrCreateByUserId(sub);
        req.user = user;
        next()

    } catch(e) {
        console.log(e)
        res.status(500).send();
    }
}