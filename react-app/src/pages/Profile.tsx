import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Card, TextField } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { borderBottom, padding } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../api/models/IUser';
import { getLocalUser, getUserByUsername, patchUser, submitUserAction } from '../api/user';
import { UserProfileChip } from '../components/UserProfileChip';
import config from "../config.json";
import { ProfilePageCard } from '../components/ProfilePageCard';
import { getProfileImageUploadUrl, uploadProfileImageFile } from '../api/image';

export default function Profile() {
    const { username } = useParams();
    const { user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [ profileUser, setProfileUser ] = useState<IUser | null>(null);
    const [ editMode, setEditMode ] = useState(false);
    const [ formUsername, setFormUsername ] = useState("");
    const [ accessToken, setAccessToken ] = useState<string | null>(null);
    const [ localUser, setLocalUser ] = useState<IUser | null>(null);
    const isLocalUser = profileUser?.user_id === user?.sub;



    const saveUserEdit = async (newUser: IUser, newProfileImageFile?: File) => {
        let saveUser = newUser;
        if(accessToken){
            if(newProfileImageFile){
                const filename = await uploadProfileImageFile(accessToken, newProfileImageFile);
                saveUser.profile_img = encodeURI(`/images/profile/${filename}`);
                console.log(saveUser);
            }
            patchUser(saveUser, accessToken)
            .then(u => { setProfileUser(u); console.log(u); if(u?.username) navigate(`/user/${u?.username}`); })
        }
    }

    const handleUserAction = async (user_id: string, action: string) => {
        if(accessToken) {
            const result = await submitUserAction(accessToken, user_id, action);
            if(result) reloadLocalAndProfileUser();
        }
    }

    const reloadLocalAndProfileUser = () => {
        getAccessTokenSilently()
        .then(t => {
            setAccessToken(t);
            getLocalUser(t)
                .then(u => setLocalUser(u))
            
            const userPromise = (username) ? 
                getUserByUsername(username, t) :
                getLocalUser(t)

            userPromise.then(u => { setProfileUser(u) })
        })
    }

    useEffect(() => {
        reloadLocalAndProfileUser();
    }, [user, username])

    useEffect(() => {
        if(profileUser?.username)
            setFormUsername(profileUser?.username)
    }, [profileUser?.username])

    if(!profileUser || !localUser){
        return(<p>Loading ...</p>)
    }
    else {
        return (
            <ProfilePageCard handleUserAction={handleUserAction} localUser={localUser} user={user} profileUser={profileUser} saveUserEdit={saveUserEdit} />
        );
    }
}