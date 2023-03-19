import { Button, Input, Paper, TextField } from '@mui/material';
import { FC } from 'react';
import { IUser } from '../api/models/IUser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProfileCard } from './ProfileCard';

export interface PlansFormProps {
    handleSubmit: () => void,
    handleExit: () => void,
    localUser: IUser,
};

export const PlansForm: FC<PlansFormProps> =  ({ handleSubmit, handleExit, localUser }) => {
    return (
        <Paper sx={{
            padding: '10px',
            position: 'absolute',
            top: '100px',
        }}>
            <div style={{
            display: 'flex',
            flexDirection: 'row',
            }}>
                <Button color='primary' onClick={() => handleExit()} size='large' sx={{
                    width: '150px',
                }}>
                    <ArrowBackIcon sx={{ marginRight: '10px' }} color='primary' />
                    Back
                </Button>
            </div>
            <div style={{
                padding: '30px'
            }}>
                <ProfileCard user={localUser} />
                <TextField
                    id="outlined-uncontrolled"
                    label="Name"
                    margin='dense'
                    variant='standard'
                />
                <TextField fullWidth multiline minRows={3} maxRows={6} 
                label="Description" id="fullWidth" margin='dense' variant='standard' />
                <Button variant='contained' color='primary' onClick={() => handleSubmit()} sx={{
                    marginTop: '30px'
                }}>Post Plan</Button>
            </div>
        </Paper>
    );
};