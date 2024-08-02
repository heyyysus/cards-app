import { Button, FormControlLabel, Input, Paper, Switch, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IUser } from '../api/models/IUser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProfileCard } from './ProfileCard';
import Datetime from 'react-datetime';
import { width } from '@mui/system';

import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IPlan } from '../api/models/IPlan';
import Step1 from './PlansFormSteps/Step1';
import Step2 from './PlansFormSteps/Step2';


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

    const [ step, setStep ] = useState(0);

    const dateFromDateTime = (date: string, time: string) => {
        return new Date(`${date}T${time}`);
    }

    const handleBack = () => {
        if(step > 0)
            setStep(step - 1);
        else
            handleExit();
    }

    const handleNextStep1 = ({ planName, planDesc, planStartDate, planEndDate, planPrivacy }: {
        planName: string,
        planDesc: string,
        planStartDate: Date,
        planEndDate: Date,
        planPrivacy: boolean,
    }) => {
        setStep(1);
        setFormName(planName);
        setFormDesc(planDesc);
        setFormStartDate(planStartDate.toISOString().split('T')[0]);
        setFormStartTime(planStartDate.toISOString().split('T')[1]);
        setFormEndDate(planEndDate.toISOString().split('T')[0]);
        setFormEndTime(planEndDate.toISOString().split('T')[1]);
        setFormPublic(planPrivacy);
    }

    const steps = [
        <Step1 localUser={localUser} handleNext={ handleNextStep1 } />,
        <Step2 />,
    ];
    

    return (
        <Paper sx={{
            padding: '10px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
        }}>
            <div style={{
            display: 'flex',
            flexDirection: 'row',
            }}>
                <Button color='primary' onClick={() => handleBack()} size='large' sx={{
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
                { steps[step] }
            </div>
        </Paper>
    );
};