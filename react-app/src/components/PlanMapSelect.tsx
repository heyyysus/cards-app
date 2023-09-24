// Similar to PlanMap.tsx, but for selecting a location on the map and returning the coordinates
// to the parent component

import { FC, useEffect, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import secret  from "../secret.json";

// Primary color from theme to use for map marker
import { useTheme } from '@mui/material/styles';

// The following is required to stop "npm build" from transpiling mapbox code.
import mapboxgl from 'mapbox-gl';
import { Button, TextField } from '@mui/material';
import { MapSearchList } from './MapSearchList';
import { searchLocation } from '../api/mapbox';
import { MapSearchListItemProps } from './MapSearchListItem';
    // notice the exclamation point in the import.
    // @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export interface PlanMapSelectProps {
    initCenter: {
        lat: number,
        lng: number,
    },
    initZoom: number,
    selectCoord: (coord: {lat: number, lng: number}) => void,
};

export const PlanMapSelect: FC<PlanMapSelectProps> =  ({initCenter, initZoom, selectCoord}) => {

    const theme = useTheme(); // Get theme to use for map marker

    const [lng, setLng] = useState(initCenter.lng);
    const [lat, setLat] = useState(initCenter.lat);
    const [zoom, setZoom] = useState(initZoom);

    const [ selectedCoord, setSelectedCoord ] = useState<{lat: number, lng: number}>({lat: 0, lng: 0});

    const [ searchQuery, setSearchQuery ] = useState("");
    const [ searchResults, setSearchResults ] = useState<MapSearchListItemProps[]>([]);

    const onMapMove = (newLat: number, newLng: number, newZoom: number) => {
        setLat(newLat);
        setLng(newLng);
        setZoom(newZoom);
    };

    const handleSearch = async () => {
        searchLocation(searchQuery, { lng: lng, lat: lat }).then((results) => {
            setSearchResults(results);
        }
        ).catch((err) => {
            console.log(err);
        });
    }

    const handleItemSelect = (item: MapSearchListItemProps) => {
        setLng(item.center.lng);
        setLat(item.center.lat);
        setZoom(15);
    }


    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Map
        mapboxAccessToken = {secret.MAPBOX_API_KEY}
        initialViewState = {{
        longitude: initCenter.lng,
        latitude: initCenter.lat,
        zoom: initZoom
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{
        width: '400px',
        height: '300px',
        }}
        onMove={(e) => { onMapMove(e.viewState.latitude, e.viewState.longitude, e.viewState.zoom) }}
    >


        <Marker longitude={lng} latitude={lat} anchor="center" color={ theme.palette.primary.main }>
            {/* <LocationOnIcon color='primary' /> */}
        </Marker>


        </Map>
        <div id="map-select-search-area" style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '400px',
            marginTop: '10px',
            marginBottom: '10px',
        }}>

            <TextField id="search-query" label="Search" variant="outlined" size="small" margin='none' sx={{
                width: '75%',
            }} 
            onChange={(e) => { setSearchQuery(e.target.value) }}
            />

            <Button variant="contained" color="primary"  sx={{
                width: '20%',
            }}
            onClick={() => { handleSearch(); }}
            > Search </Button>

        </div>

        <MapSearchList
            listItems={ searchResults.map((item) => { return { ...item, onSelect: () => { handleItemSelect(item) } } }) }
        />
    </div>);
}