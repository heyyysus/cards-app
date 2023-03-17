import { Button, Paper, Tab, Tabs } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IUser } from '../api/models/IUser';
import { UserList } from './UserList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { minWidth } from '@mui/system';

export interface BiFollowListProps {
    localUser: IUser,
    followingList: IUser[],
    followersList: IUser[]
    initialTab?: number,
    handleExit: () => void,
    handleUserAction: (user_id: string, action: string) => void,
};

export const BiFollowList: FC<BiFollowListProps> =  ({localUser, initialTab, followingList, followersList, handleExit, handleUserAction}) => {
    const [ selectedTab, setSelectedTab ] = useState(initialTab || 0);
    useEffect(() => { if(initialTab !== undefined) setSelectedTab(initialTab) }, [initialTab])
    return (
    <Paper elevation={3} sx={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '350px',
        overflowY: 'scroll',
        maxHeight: '75vh',
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
        <Tabs
        variant='fullWidth'
        value={selectedTab}
        onChange={(e, v) => setSelectedTab(v)}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        >
            <Tab value={0} label="Following" />
            <Tab value={1} label="Followers" />
        </Tabs>
        { (selectedTab === 0) ? 
            <UserList handleUserAction={handleUserAction} handleExit={handleExit} localUser={localUser} userList={followingList} />
            :
            <UserList handleUserAction={handleUserAction} handleExit={handleExit} localUser={localUser} userList={followersList} />

        }
    </Paper>)
    ;
};