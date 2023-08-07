import { FC, useEffect, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import secret  from "../secret.json";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export interface PlanFeedMapProps {
    center: { 
        lat: number,
        lng: number,
    }, 
    zoom: number
};

export const PlanFeedMap: FC<PlanFeedMapProps> =  ({center, zoom}) => {
    return <Map
    mapboxAccessToken = {secret.MAPBOX_API_KEY}
    initialViewState = {{
      longitude: center.lng,
      latitude: center.lat,
      zoom: zoom
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Marker longitude={center.lng} latitude={center.lat} anchor="bottom" >
        {/* <LocationOnIcon color='primary' /> */}
    </Marker>
  </Map>;
};