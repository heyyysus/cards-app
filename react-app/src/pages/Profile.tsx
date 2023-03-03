import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../api/models/IUser';
import { getLocalUser, getUserByUsername } from '../api/user';
import { UserProfileChip } from '../components/UserProfileChip';
import config from "../config.json";

export default function Profile() {
    const { username } = useParams();
    const { user, getAccessTokenSilently } = useAuth0();

    const [ profileUser, setProfileUser ] = useState<IUser | null>(null);

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            const userPromise = (username) ? 
                getUserByUsername(username, t) :
                getLocalUser(t)

            userPromise.then(u => { setProfileUser(u) })
        })
    }, [user?.sub])

    if(!profileUser){
        return(<p>Loading ...</p>)
    }
    else {
        return (
            <Card variant='outlined'>
                <Avatar
                    alt={profileUser.username}
                    src={profileUser.profile_img || `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`}
                    sx={{ width: 100, height: 100, margin: '20px' }}
                />
            </Card>
        );
    }
}