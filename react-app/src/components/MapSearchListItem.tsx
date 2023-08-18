import { FC } from 'react';

export interface MapSearchListItemProps {
    mapbox_id: string,
    name: string,
    address: string,
    place_formatted: string,
    onSelect: () => void,
};

export const MapSearchListItem: FC<MapSearchListItemProps> = ({mapbox_id, name, address, place_formatted, onSelect}) => {
    return (
    <div className="map-search-list-item">
        <div className="map-search-list-item-name">{name}</div>
        <div className="map-search-list-item-address">{address}</div>
    </div>
    );
};
