import { Avatar, Card, Chip, Skeleton } from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../api/models/IUser';
import config from '../config.json';

export interface UserProfileChipProps {
    user?: IUser | null,
};

export const UserProfileChip: FC<UserProfileChipProps> =  ({ user }) => {
    const navitate = useNavigate();

    if(!user) return (
        <>
            <Skeleton variant="rounded" height={80} />
        </>
    );
    else return (
        <Card variant='outlined' sx={{
            padding: '15px',
            transition: 'background-color 0.3s',
            ':hover': {
                cursor: 'pointer',
                backgroundColor: '#eee',
            },
            display: 'flex',
            flexDirection: 'row',
        }}
        onClick={() => {
            navitate(`/user/${user.username}`)
        }}
        >
            <Avatar
                alt={user.username}
                src={user.profile_img || `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`}
                sx={{ width: 50, height: 50, marginRight: '20px' }}
            />

            <p>{user.username}</p>
        </Card>
    );
};