import { Button, FormControlLabel, Input, Paper, Switch, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IUser } from '../api/models/IUser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProfileCard } from './ProfileCard';
import Datetime from 'react-datetime';
import { width } from '@mui/system';

import PublicIcon from '@mui/icons-material/Public';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IPlan } from '../api/models/IPlan';


export interface PlansFormProps {
    handleSubmit: (plan: IPlan) => void,
    handleExit: () => void,
    localUser: IUser,
};

export const PlansForm: FC<PlansFormProps> =  ({ handleSubmit, handleExit, localUser }) => {
    const ISODateTime = (new Date()).toISOString().split('T')
    const ISODate = ISODateTime[0]

    const ISOTime = "";
    const [ formName, setFormName ] = useState("");
    const [ formDesc, setFormDesc ] = useState("");
    const [ formStartDate, setFormStartDate ] = useState<string>(ISODate);
    const [ formStartTime, setFormStartTime ] = useState<string>(ISOTime);
    const [ formEndDate, setFormEndDate ] = useState<string>(ISODate);
    const [ formEndTime, setFormEndTime ] = useState<string>(ISOTime);
    const [ formPublic, setFormPublic ] = useState(true);

    const dateFromDateTime = (date: string, time: string) => {
        return new Date(`${date}T${time}`);
    }

    return (
        <Paper sx={{
            padding: '10px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
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
                padding: '30px',
                overflowY: 'scroll'
            }}>
                <ProfileCard user={localUser} />
                
                <TextField
                    id="name-field"
                    label="Name"
                    margin='dense'
                    variant='standard'
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                />

                <TextField fullWidth multiline minRows={3} maxRows={6} 
                label="Description" id="description-field" margin='dense' variant='standard'
                value={formDesc} onChange={(e) => setFormDesc(e.target.value)} />
                
                <div style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                }}>
                    <p>Event Start: </p>

                    <input type='date' value={formStartDate} style={{marginRight: '10px'  }} 
                        onChange={e => {setFormStartDate(e.target.value)}} />

                    <input type='time' value={formStartTime} 
                        onChange={e => {setFormStartTime(e.target.value)}} />
                </div>

                <div style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                }}>
                    <p>Event End: </p>
                    <input type='date' value={formEndDate} style={{marginRight: '10px'  }} 
                        onChange={e => {setFormEndDate(e.target.value)}} />

                    <input type='time' value={formEndTime} 
                        onChange={e => {setFormEndTime(e.target.value)}} />
                </div>
                
                <div>
                    <FormControlLabel label={(formPublic) ? 
                        (<div>Public Plan</div>) : 
                        (<div>Invitees Only</div>)}
                    control={<Switch color='primary' defaultChecked onChange={() => setFormPublic(!formPublic)}/>}  />
                </div>

                <Button variant='contained' color='primary' onClick={() => {
                    handleSubmit({
                        plan_id: 0,
                        plan_name: formName,
                        plan_desc: formDesc,
                        author: localUser,
                        start_ts: dateFromDateTime(formStartDate, formStartTime),
                        end_ts: dateFromDateTime(formEndDate, formEndTime)
                    })
                }} sx={{
                    marginTop: '30px'
                }}>Post Plan</Button>
            </div>
        </Paper>
    );
};