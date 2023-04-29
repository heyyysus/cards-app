import React, { FC } from "react";
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GOOGLE_MAPS_API_KEY}  from "../secret.json";

const AnyReactComponent = ({ text, lat, lng }: {text: string, lat: number, lng: number}) => 
    <LocationOnIcon sx={{width: '5vh', height: '5vh', position: 'relative', right: '2.5vh', bottom: '4vh'}} color='primary' />;

export interface SimpleMapProps {
    center: { 
        lat: number,
        lng: number,
    }, 
    zoom: number
};

export const  SimpleMap: FC<SimpleMapProps> = ({ center, zoom }) => {


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent
            lat={center.lat}
            lng={center.lng}
            text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}