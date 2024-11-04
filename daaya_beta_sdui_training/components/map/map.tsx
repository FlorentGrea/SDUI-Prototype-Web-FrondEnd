'use client'

import { useState, createContext, useContext } from 'react';
import ReactMapGl, { ViewStateChangeEvent } from 'react-map-gl';
import React from 'react';

interface MapContextType {
  selectedId: number;
  setSelectedId: (id: number) => void;
  viewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  setViewState: (viewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  }) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function useMapContext() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a Map component');
  }
  return context;
}

export default function Map({ children }: { children?: React.ReactNode }) {
    const [viewState, setViewState] = useState({
        latitude: 46.2276,
        longitude: 2.2137,
        zoom: 4
    });
    const [selectedId, setSelectedId] = useState(0);

    React.useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setViewState(prev => ({
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
        <MapContext.Provider value={{ 
            selectedId, 
            setSelectedId,
            viewState,
            setViewState
        }}>
            <ReactMapGl
                mapStyle={'mapbox://styles/canardwc/clyyn8d2q00cl01r23wk58eqb'}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}
                {...viewState}
                onMove={(event: ViewStateChangeEvent) => setViewState(event.viewState)}
            >
                {children}
            </ReactMapGl>
        </MapContext.Provider>
    )
}