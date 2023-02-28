import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { getLocalUser } from '../api/auth';
import { IUser } from '../api/models/IUser';
import { LoginButton } from '../components/LoginButton';
import { ProfileCard } from '../components/ProfileCard';

import Styles from './Home.module.css';

export interface HomePageProps {};

const HomePage: FC<HomePageProps> = ({  }) => {

    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const [ localUser, setLocalUser ] = useState<IUser | null>(null);

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            getLocalUser(t)
            .then(u => { console.log(u); setLocalUser(u) })
        })
    }, [getAccessTokenSilently, user?.sub])

    if(isLoading || (isAuthenticated && !localUser))
        return (
            <p>Loading...</p>
        );
    else if (localUser){
        return(
        <>
        <p>{localUser.username}'s profile</p>
        <Avatar
            alt={localUser.username}
            src="/static/images/profile/default.png"
            sx={{ width: 24, height: 24 }}
            />
        </>
        );
    }
   else
    return (<></>);
};

export default HomePage;