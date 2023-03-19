export type auth_role = 'USER' | 'ADMIN'

export interface IUser {
    user_id: string,
    username?: string,
    profile_img?: string,
    bio?: string,
    following?: IUser[],
    followers?: IUser[],
    ts?: Date,
}