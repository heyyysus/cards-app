import { FC } from 'react';
import styles from '../styles/MapSearchListItem.module.css';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

export interface MapSearchListItemProps {
    mapbox_id: string,
    name: string,
    address: string,
    place_formatted: string,
    center: {lng: number, lat: number},
    onSelect: () => void,
};

export const MapSearchListItem: FC<MapSearchListItemProps> = ({mapbox_id, name, address, place_formatted, onSelect}) => {
    return (
    <div className={ styles.mapSearchListItem } onClick={onSelect}>
        <div style = {{
            display: 'flex',
            flexDirection: 'column',
            marginRight: 'auto',
        }}>
            <div className={ styles.mapSearchListItemName }>
                <b>{name}</b>
            </div>
            <div className={ styles.mapSearchListItemAddress }>{address}</div>
            <div className={ styles.mapSearchListItemAddress } >{place_formatted}</div>
        </div>
        <Button variant="contained" onClick={ onSelect }>
            <LocationSearchingIcon />
        </Button>
    </div>
    );
};
