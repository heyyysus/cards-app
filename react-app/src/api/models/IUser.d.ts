export type auth_role = 'USER' | 'ADMIN'

export interface IUser {
    user_id: string,
    email?: string,
    username?: string,
    profile_img?: string,
    bio?: string,
    auth?: auth_role,
    ts?: Date,
}