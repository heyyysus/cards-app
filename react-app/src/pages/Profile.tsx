import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Card, TextField } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { borderBottom, padding } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../api/models/IUser';
import { getLocalUser, getUserByUsername, patchUser } from '../api/user';
import { UserProfileChip } from '../components/UserProfileChip';
import config from "../config.json";
import { ProfilePageCard } from '../components/ProfilePageCard';

export default function Profile() {
    const { username } = useParams();
    const { user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [ profileUser, setProfileUser ] = useState<IUser | null>(null);
    const [ editMode, setEditMode ] = useState(false);
    const [ formUsername, setFormUsername ] = useState("");
    const [ accessToken, setAccessToken ] = useState<string | null>(null);

    const isLocalUser = profileUser?.user_id === user?.sub;

    

    const saveUserEdit = (newUser: IUser) => {
        if(accessToken)
            patchUser(newUser, accessToken)
                .then(u => { setProfileUser(u); navigate(`/user/${u?.username}`) })
    }

    useEffect(() => {
        getAccessTokenSilently()
        .then(t => {
            setAccessToken(t);
            const userPromise = (username) ? 
                getUserByUsername(username, t) :
                getLocalUser(t)

            userPromise.then(u => { setProfileUser(u) })
        })
    }, [user])

    useEffect(() => {
        if(profileUser?.username)
            setFormUsername(profileUser?.username)
    }, [profileUser?.username])

    if(!profileUser){
        return(<p>Loading ...</p>)
    }
    else {
        return (
            <ProfilePageCard user={user} profileUser={profileUser} saveUserEdit={saveUserEdit} />
        );
    }
}