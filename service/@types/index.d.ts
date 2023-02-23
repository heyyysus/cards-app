import { IUser } from "../src/user";

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}