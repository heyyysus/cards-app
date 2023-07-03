import { FC, useEffect, useRef, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import secret  from "../secret.json";

mapboxgl.accessToken = secret.MAPBOX_API_KEY;

export interface PlanFeedMapProps {
    center: { 
        lat: number,
        lng: number,
    }, 
    zoom: number
};

export const PlanFeedMap: FC<PlanFeedMapProps> =  ({center, zoom}) => {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current as any,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [center.lng, center.lat],
            zoom: zoom,
        });
    });

    // useEffect(() => {
    // if (!map.current) return; // wait for map to initialize
    //     map.current.on('move', () => {
    //         setLng(map.current.getCenter().lng.toFixed(4));
    //         setLat(map.current.getCenter().lat.toFixed(4));
    //         setZoom(map.current.getZoom().toFixed(2));
    //     });
    // });

    return (
    <div>
        <div ref={mapContainer} className="map-container" />
    </div>
    );
};