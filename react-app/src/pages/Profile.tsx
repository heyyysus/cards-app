import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Card, TextField } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { borderBottom, padding } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../api/models/IUser';
import { getLocalUser, getUserByUsername, patchUser } from '../api/user';
import { UserProfileChip } from '../components/UserProfileChip';
import config from "../config.json";

export default function Profile() {
    const { username } = useParams();
    const { user, getAccessTokenSilently } = useAuth0();

    const [ profileUser, setProfileUser ] = useState<IUser | null>(null);
    const [ editMode, setEditMode ] = useState(false);
    const [ formUsername, setFormUsername ] = useState("");
    const [ accessToken, setAccessToken ] = useState<string | null>(null);

    const isLocalUser = profileUser?.user_id === user?.sub;

    const handleSaveEdit = () => {
        if(formUsername !== profileUser?.username && profileUser && accessToken){
            let newUser = profileUser;
            newUser.username = formUsername;
            patchUser(newUser, accessToken)
            .then(u => { setProfileUser(u); setEditMode(false) })
        }
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
            <Card variant='outlined' sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Avatar
                    alt={profileUser.username}
                    src={profileUser.profile_img || `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`}
                    sx={{ width: 100, height: 100, marginBottom: '20px' }}
                />
                {(editMode) ? (
                    <TextField 
                        id="username_field" 
                        label="Username" 
                        variant="standard" 
                        value={formUsername} 
                        onChange={ (e) => setFormUsername(e.target.value) }
                        margin='normal'
                        sx={{
                            maxWidth: '15vw',
                        }}
                    />
                ) : (
                    <p>{profileUser.username}</p>
                ) }

                {(isLocalUser && !editMode) ? 
                (<ModeEditOutlineOutlinedIcon 
                    color='primary'
                    onClick={(e) => { setEditMode(true) }}
                    sx={{
                        ':hover': {
                            cursor: 'pointer'
                        }
                    }}
                />) : 
                (<></>)}
                
                {(isLocalUser && editMode) ? (
                    <CheckOutlinedIcon onClick={(e) => { handleSaveEdit() }} sx={{
                        ':hover': {
                            cursor: 'pointer'
                        }
                    }} />
                ) : (<></>)}

            </Card>
        );
    }
}