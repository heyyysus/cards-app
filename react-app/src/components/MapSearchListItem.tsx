import { FC } from 'react';
import styles from '../styles/MapSearchListItem.module.css';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface MapSearchListItemProps {
    mapbox_id: string,
    name: string,
    address: string,
    place_formatted: string,
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
            <div className="map-search-list-item-address">{address}</div>
            <div className="map-search-list-item-place-formatted">{place_formatted}</div>
        </div>
        <Button variant="outlined" endIcon={<ArrowForwardIosIcon />} onClick={ onSelect }>
            Select
        </Button>
    </div>
    );
};
