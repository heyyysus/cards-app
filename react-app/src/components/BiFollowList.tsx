import { Tab, Tabs } from '@mui/material';
import { FC, useState } from 'react';
import { IUser } from '../api/models/IUser';
import { UserList } from './UserList';

export interface BiFollowListProps {
    localUser: IUser,
    followingList: IUser[],
    followersList: IUser[]
    initialTab?: number,
};

export const BiFollowList: FC<BiFollowListProps> =  ({localUser, initialTab, followingList, followersList}) => {
    const [ selectedTab, setSelectedTab ] = useState(initialTab || 0);
    return (
    <>
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
            <UserList localUser={localUser} userList={followingList} />
            :
            <UserList localUser={localUser} userList={followersList} />

        }
    </>)
    ;
};