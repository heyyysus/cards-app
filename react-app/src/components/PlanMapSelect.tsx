// Similar to PlanMap.tsx, but for selecting a location on the map and returning the coordinates
// to the parent component

import { FC, useEffect, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import secret  from "../secret.json";

// Primary color from theme to use for map marker
import { useTheme } from '@mui/material/styles';

// The following is required to stop "npm build" from transpiling mapbox code.
import mapboxgl from 'mapbox-gl';
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

    const onMapMove = (newLat: number, newLng: number, newZoom: number) => {
        setLat(newLat);
        setLng(newLng);
        setZoom(newZoom);
        console.log("newLat: " + newLat + ", newLng: " + newLng + ", newZoom: " + newZoom);
    };

    return <Map
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
  </Map>;
}