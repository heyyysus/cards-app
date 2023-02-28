import { Avatar, Chip } from '@mui/material';
import { FC } from 'react';
import { IUser } from '../api/models/IUser';
import config from '../config.json';

export interface UserProfileChipProps {
    user: IUser,
};

export const UserProfileChip: FC<UserProfileChipProps> =  ({ user }) => {
    return (
        <Chip
            size='medium'
            avatar={
                <Avatar
                    alt={user.username}
                    src={user.profile_img || `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`}
                    sx={{ width: 50, height: 50 }}
                    />
            }
            label={user.username}
            variant="outlined"
        />
    );
};