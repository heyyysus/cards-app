import { User } from '@auth0/auth0-spa-js';
import { FC } from 'react';
import config from "../config.json";
import { Avatar, CardContent } from '@mui/material';
import { IUser } from '../api/models/IUser';

export interface ProfileCardProps {
    user: IUser,
    className?: string,
};

export const ProfileCard: FC<ProfileCardProps> =  ({ user, className }) => {
    return (
        <CardContent className={className} sx={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Avatar 
                sx={{ width: 50, height: 50, marginRight: '20px' }} 
                src={ user.profile_img ? `${config.IMAGE_ROOT_URL}${user.profile_img}` : `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}` } 
            /> 
            <p>{ user.username }</p>
        </CardContent>
    );
};