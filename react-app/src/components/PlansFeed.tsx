import { Divider, List, ListItem } from '@mui/material';
import { FC } from 'react';
import { IPlan } from '../api/models/IPlan';
import { IUser } from '../api/models/IUser';
import { PlansFeedItem } from './PlansFeedItem';
import { User } from '@auth0/auth0-react';

export interface PlansFeedProps {
    planItemList: IPlan[],
    localUser: IUser,
    user?: User,
};

export const PlansFeed: FC<PlansFeedProps> =  ({ planItemList, localUser, user }) => {
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    }}>
        { planItemList.map(p => (
                <PlansFeedItem user={user} key={p.plan_id} localUser={localUser} planItem={p} />
            )) }
    </div>
    );
};