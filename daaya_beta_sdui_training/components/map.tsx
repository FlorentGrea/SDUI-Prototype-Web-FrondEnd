'use client'

import ReactMapGl, { ViewStateChangeEvent } from 'react-map-gl';
import { useContainerContext } from './Container/contextsGestion';
import { useEffect, useRef } from 'react';

export default function Map({ children }: { children?: React.ReactNode }) {
    const viewStateContext = useContainerContext('ViewState');
    const viewStateRef = useRef(viewStateContext);

    useEffect(() => {
        viewStateRef.current = viewStateContext;
    }, [viewStateContext]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    viewStateRef.current?.setValue(prev => ({
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zoom: 6
                    }));
                },
                (error) => {
                    console.log("Error getting location:", error);
                }
            );
        }
    }, []);

    return (
            <ReactMapGl
                mapStyle={'mapbox://styles/canardwc/clyyn8d2q00cl01r23wk58eqb'}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, outline: 'none'}}
                {...viewStateRef.current?.value}
                projection={{ name: 'globe' }}
                onMove={(event: ViewStateChangeEvent) => viewStateRef.current?.setValue({
                    latitude: event.viewState.latitude,
                    longitude: event.viewState.longitude,
                    zoom: event.viewState.zoom
                })}
            >
                {children}
            </ReactMapGl>
    )
}