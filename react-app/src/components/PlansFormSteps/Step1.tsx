// React component

import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import React from 'react';
import { FC } from 'react';
import { IUser } from '../../api/models/IUser';
import { ProfileCard } from '../ProfileCard';

import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';

export interface Step1Props {
    localUser: IUser,
    handleNext: ({
                planName, 
                planDesc, 
                planStartDate, 
                planEndDate,
                planPrivacy
            }: {
                    planName: string,
                    planDesc: string,
                    planStartDate: Date,
                    planEndDate: Date,
                    planPrivacy: boolean,
                }) => void,
};

const Step1 = ({ localUser, handleNext }: Step1Props) => {

    const [ formName, setFormName ] = React.useState("");
    const [ formDesc, setFormDesc ] = React.useState("");
    const [ formStartDate, setFormStartDate ] = React.useState<string>("");
    const [ formStartTime, setFormStartTime ] = React.useState<string>("");
    const [ formEndDate, setFormEndDate ] = React.useState<string>("");
    const [ formEndTime, setFormEndTime ] = React.useState<string>("");
    const [ formPublic, setFormPublic ] = React.useState(true);

    const dateFromDateTime = (date: string, time: string) => {
        return new Date(`${date}T${time}`);
    }

    const nextEnabled = () => {
        return (
            formName !== "" && 
            formDesc !== "" && 
            formStartDate !== "" && 
            formStartTime !== "" && 
            formEndDate !== "" && 
            formEndTime !== ""
            ) && areDatesValid();
    }

    const areDatesValid = () => {
        try {
            const startDate = dateFromDateTime(formStartDate, formStartTime);
            const endDate = dateFromDateTime(formEndDate, formEndTime);
        return (startDate < endDate);
        } catch (e) {
            return false;
        }
    }

    return (
    <>
    
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
            
            { 
                !areDatesValid() && 
                formStartDate && 
                formStartTime &&
                formEndDate &&
                formEndTime &&
                <p style={{color: 'red'}}>Invalid start and end dates</p> 
            }
        </div>
        
        <div>
            <FormControlLabel label={(formPublic) ? 
                (<div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <PublicIcon /> 
                    <span style={{
                        marginLeft: '7px',
                        paddingTop: '4px',
                    }}>
                        Public
                    </span>
                </div>) : 
                (<div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <PeopleIcon /> 
                    <span style={{
                        marginLeft: '7px',
                        paddingTop: '4px',
                    }}>
                        Friends Only
                    </span>
                </div>)}
            control={<Switch color='primary' defaultChecked onChange={() => setFormPublic(!formPublic)}/>}  />
        </div>

        <Button 
            variant='contained' 
            color='primary'
            disabled={!nextEnabled()}
            onClick={() => {
                handleNext({
                    planName: formName,
                    planDesc: formDesc,
                    planStartDate: dateFromDateTime(formStartDate, formStartTime),
                    planEndDate: dateFromDateTime(formEndDate, formEndTime),
                    planPrivacy: formPublic,
                })
        }} sx={{
            marginTop: '30px',
        }}>Next</Button>
    </>
    );
}

export default Step1;