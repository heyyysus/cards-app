import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { IUser } from '../api/models/IUser';
import { getLocalUser } from '../api/user';

import Theme from "../utils/theme";

export default function ButtonAppBar() {

    const { 
        user, 
        isAuthenticated, 
        isLoading, 
        getAccessTokenSilently ,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const [ localUser, setLocalUser ] = useState<IUser | null>(null);

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            getLocalUser(t)
            .then(u => { console.log(u); setLocalUser(u) })
        })
    }, [getAccessTokenSilently, user?.sub])

  return (
    <Box sx={ {flexGrow: 1} }>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hop In
          </Typography>
          {
            (isAuthenticated) ? 
            (<Button color="inherit" onClick={() => logout()}>Logout</Button>) : 
            (<Button color="inherit" onClick={() => loginWithRedirect()}>Login</Button>)
          }
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}