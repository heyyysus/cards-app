import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { IUser } from '../api/models/IUser';
import { UserProfileChip } from './UserProfileChip';
import { getLocalUser } from '../api/user';

export interface AccountSettingsListProps {
};

export const AccountSettingsList: FC<AccountSettingsListProps> = () => {

    const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
    const [ localUser, setLocalUser ] = useState<IUser | null>(null);

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            console.log(t);
            getLocalUser(t)
            .then(u => { console.log(u); setLocalUser(u) })
        })
    }, [getAccessTokenSilently, user?.sub])

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <nav aria-label="main profile items">
        <UserProfileChip user={localUser} />
        <List>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Direct Messages" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>

      <Divider />
      <nav aria-label="secondary profile items">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Logout" onClick={() => logout()} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}