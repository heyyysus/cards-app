import { Avatar, Button, ButtonBase, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IUser } from '../api/models/IUser';
import config from "../config.json";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export interface UserListItemProps {
    user: IUser,
    localUserfollows: boolean, 
    followsLocalUser: boolean,
    handleExit?: () => void,
    handleUserAction: (user_id: string, action: string) => void,
};

export const UserListItem: FC<UserListItemProps> = ({ user, localUserfollows, followsLocalUser, handleExit, handleUserAction }) => {
    const navigate = useNavigate();

    return (
        <ListItem
        key={user.user_id}
        secondaryAction={
            <>
            {(localUserfollows) 
            ?
            <Button 
                variant='outlined' 
                color='error'  
                size='small'
                onClick={() => handleUserAction(user.user_id, 'unfollow')}
                >
                Unfollow
            </Button>
            :
            <Button 
                variant='outlined' 
                color='primary'  
                size='small'
                onClick={() => handleUserAction(user.user_id, 'follow')}
                >
                Follow
            </Button>
            }
            </>
          }
        sx={{

        }}>
        <ButtonBase onClick={ () => { if(handleExit) handleExit(); navigate(`/user/${user.username}`) } }>
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={user.profile_img || `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`} />
            </ListItemAvatar>
            <ListItemText
            primary={user.username}
            />
        </ButtonBase>
      </ListItem>
    ); 
}

export interface UserListProps {
    localUser: IUser,
    userList: IUser[],
    handleExit?: () => void,
    handleUserAction: (user_id: string, action: string) => void,
};

export const UserList: FC<UserListProps> =  ({ localUser, userList, handleExit, handleUserAction }) => {

    return (
    <List
    sx={{
        width: "100%",
    }}>
    {
        userList.map(u => {
            const localUserfollows = localUser.following?.some(f => f.user_id === u.user_id) || false;
            const followsLocalUser = localUser.followers?.some(f => f.user_id === u.user_id) || false;
            return <UserListItem 
                    handleExit={handleExit} user={u} 
                    localUserfollows={localUserfollows} 
                    followsLocalUser={followsLocalUser} 
                    handleUserAction={handleUserAction}
                />;
        })
    }
    </List>
    );
};