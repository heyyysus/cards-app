import { User } from '@auth0/auth0-spa-js';
import { FC } from 'react';

import { CardContent } from '@mui/material';

export interface ProfileCardProps {
    user: User,
    className?: string,
};

export const ProfileCard: FC<ProfileCardProps> =  ({ user, className }) => {
    return (
        <CardContent className={className}>
            <img src={ user.picture } /> 
            <p>{ user.sub }</p>
        </CardContent>
    );
};