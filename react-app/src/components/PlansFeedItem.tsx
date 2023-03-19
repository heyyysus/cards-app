import { FC } from 'react';
import { IPlan } from '../api/models/IPlan';
import { IUser } from '../api/models/IUser';

export interface PlansFeedItemProps {
    planItem: IPlan,
    localUser: IUser,
};

export const PlansFeedItem: FC<PlansFeedItemProps> =  ({ planItem }) => {
    return (
    <>
        
    </>
    );
};