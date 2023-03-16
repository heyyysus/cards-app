import { Avatar, Backdrop, Card, InputAdornment, TextField } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { FC, useEffect, useState } from 'react';
import { IUser } from '../api/models/IUser';
import config from "../config.json";
import { User } from '@auth0/auth0-react';
import { ImageSelectionBox } from './ImageSelectionBox';

export interface ProfilePageCardProps {
    profileUser: IUser,
    user?: User,
    saveUserEdit: (newUser: IUser, newProfileImageFile?: File) => void;
};

export const ProfilePageCard: FC<ProfilePageCardProps> =  ({ profileUser, user, saveUserEdit }) => {
    const [ editMode, setEditMode ] = useState(false);
    const [ pictureEditMode, setPictureEditMode ] = useState(false);
    const [ formUsername, setFormUsername ] = useState("");
    const [ formBio, setFormBio] = useState("");
    const [ tempLocalProfileImage, setTempLocalProfileImage ] = useState<string | null>(null);
    const [ formImage, setFormImage ] = useState<File | undefined>(undefined);
    const isLocalUser = profileUser?.user_id === user?.sub;


    const handleSaveEdit = () => {
        if((formUsername !== profileUser?.username || formBio !== profileUser.bio || formImage) && profileUser){
            let newUser = profileUser;
            newUser.username = formUsername;
            newUser.bio = formBio;
            saveUserEdit(newUser, formImage)
        }
        setEditMode(false);
    }

    const handleImageFileSubmit = (file: File) => {
        const localPath = URL.createObjectURL(file);
        setTempLocalProfileImage(localPath);
        setFormImage(file);
    }

    useEffect(() => {
        setFormUsername(profileUser.username || "")
        setFormBio(profileUser.bio || "")
    }, []);

    return (
        <Card variant='outlined' sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {(editMode) ? (
                <>
                <Avatar
                    alt={profileUser.username}
                    src={tempLocalProfileImage || profileUser.profile_img || `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`}
                    sx={{ 
                        width: 100, 
                        height: 100, 
                        marginBottom: '20px',
                        ':hover': {
                            filter: 'brightness(50%)',
                            cursor: 'pointer'
                        },
                        transition: 'filter 0.25s'
                    }}
                    onClick={
                        () => { setPictureEditMode(!pictureEditMode) }
                    }
                />
                
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={pictureEditMode}
                >
                    <ImageSelectionBox 
                        closeButtonHandler={() => setPictureEditMode(false)} 
                        handleSubmit={handleImageFileSubmit}
                    />
                    
                </Backdrop>
                
                <TextField 
                    id="username_field" 
                    label="Username" 
                    variant="standard" 
                    value={formUsername} 
                    onChange={ (e) => setFormUsername(e.target.value) }
                    margin='normal'
                    sx={{
                        width: '200px',
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position='start' >@</InputAdornment>
                    }}
                />

                <TextField
                    id="user_bio_field"
                    label="Bio"
                    variant="standard"
                    value={formBio}
                    onChange={ (e) => setFormBio(e.target.value) }
                    margin='normal'
                    sx={{
                        minWidth: '400px',
                        width: '70vw'
                    }}
                    multiline
                    minRows={3}
                    maxRows={6}
                />

                </>
               
            ) : (
                <>
                <Avatar
                    alt={profileUser.username}
                    src={profileUser.profile_img || `${process.env.PUBLIC_URL}${config.DEFAULT_PROFILE_IMAGE}`}
                    sx={{ width: 100, height: 100, marginBottom: '20px' }}
                />
                <p>@{profileUser.username}</p>
                <p><b>Bio: </b>{profileUser.bio}</p>
                </>
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
};