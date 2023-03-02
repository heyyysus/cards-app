import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import { Avatar, Button, Chip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { getLocalUser } from '../api/auth';
import { IUser } from '../api/models/IUser';
import { LoginButton } from '../components/LoginButton';
import { ProfileCard } from '../components/ProfileCard';
import { UserProfileChip } from '../components/UserProfileChip';

import config from '../config.json';

import Styles from './Home.module.css';

export interface HomePageProps {};

const HomePage: FC<HomePageProps> = ({  }) => {

    const { logout } = useAuth0();

    return (<>
        <Button onClick={() => {logout()}} >Logout</Button>
    </>)
};

export default HomePage;