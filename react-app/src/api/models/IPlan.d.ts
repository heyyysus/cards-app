import { IUser } from "./IUser";

export interface IPlan{
    plan_id: number,
    plan_name?: string,
    plan_desc?: string,
    author?: IUser,
    start_ts?: Date,
    end_ts?: Date,
    ts?: Date,
}