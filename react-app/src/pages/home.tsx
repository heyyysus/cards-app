import { GetTokenSilentlyOptions, useAuth0 } from '@auth0/auth0-react';
import { Avatar, Backdrop, Button, Chip, Fab, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { FC, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { getLocalUser } from '../api/user';
import { IUser } from '../api/models/IUser';
import { LoginButton } from '../components/LoginButton';
import { ProfileCard } from '../components/ProfileCard';
import { UserProfileChip } from '../components/UserProfileChip';

import config from '../config.json';

import Styles from './Home.module.css';
import { PlansForm } from '../components/PlansForm';

export interface HomePageProps {};

const HomePage: FC<HomePageProps> = ({  }) => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [ localUser, setLocalUser ] = useState<IUser | null>(null);
    const [ showPlansForm, setShowPlansForm ] = useState(false);

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            getLocalUser(t)
                .then(u => setLocalUser(u))
        })
    }, [user])

    if(!localUser){
        return(<p>Loading...</p>);
    }

    return (
    <>
        <Backdrop 
        sx={{ 
            color: '#fff', 
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={showPlansForm}
        >
            
        <PlansForm localUser={localUser} handleSubmit={() => {}} handleExit={() => setShowPlansForm(false)} />
            
        </Backdrop>
        <Fab color="primary" aria-label="add" onClick={() => setShowPlansForm(true)} sx={{
            position: 'absolute',
            bottom: '100px',
            justifySelf: 'center',
            alignSelf: 'center',
        }}>
            <AddIcon />
        </Fab>
    </>
    )
};

export default HomePage;