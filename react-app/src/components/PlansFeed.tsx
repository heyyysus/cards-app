import { Divider, List, ListItem } from '@mui/material';
import { FC } from 'react';
import { IPlan } from '../api/models/IPlan';
import { IUser } from '../api/models/IUser';
import { PlansFeedItem } from './PlansFeedItem';
import { User } from '@auth0/auth0-react';

export interface PlansFeedProps {
    planItemList: IPlan[],
    localUser: IUser,
    handlePlanAction: (plan_id: number, action: string) => void;
};

export const PlansFeed: FC<PlansFeedProps> =  ({ planItemList, localUser, handlePlanAction }) => {
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    }}>
        { planItemList.map(p => (
                <PlansFeedItem 
                    key={ p.plan_id } 
                    localUser={localUser} 
                    planItem={p} 
                    handlePlanAction={ handlePlanAction } 
                />
            )) }
    </div>
    );
};