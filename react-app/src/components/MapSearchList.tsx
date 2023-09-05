import { FC } from 'react';
import { MapSearchListItem, MapSearchListItemProps } from './MapSearchListItem';

export interface MapSearchListProps {
    listItems: MapSearchListItemProps[],
};

export const MapSearchList: FC<MapSearchListProps> = ({ listItems }) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            height: '40vh',
            overflowY: 'scroll',
        }}>
            { listItems.map((item, index) => { 
                return <MapSearchListItem key={index} {...item} />
             }) 
            }
        </div>
    );
};