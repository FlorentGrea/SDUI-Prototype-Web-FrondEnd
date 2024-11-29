/**
 * Interactive Map Component
 * 
 * A wrapper around ReactMapGl that provides:
 * - Automatic geolocation on mount
 * - Context-based view state management
 * - Globe projection support
 * - Responsive layout
 */

'use client'  // Mark as client component for Next.js

import ReactMapGl, { ViewStateChangeEvent } from 'react-map-gl';
import { useContainerContext } from '../container/contextsGestion';
import { useEffect, useRef } from 'react';

/**
 * Map component that handles view state and geolocation
 * @param children - Optional child components (markers, popups, etc.)
 */
export default function Map({ children }: { children?: React.ReactNode }) {
    // Get view state from context
    const viewStateContext = useContainerContext('ViewState');
    // Ref to track initial position setting
    const hasSetInitialPosition = useRef(false);

    /**
     * Effect to handle initial geolocation
     * - Runs once on mount
     * - Updates context with user's location
     * - Falls back gracefully on error
     */
    useEffect(() => {
        if (!hasSetInitialPosition.current && "geolocation" in navigator) {
            hasSetInitialPosition.current = true;
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    viewStateContext?.setValue(prev => ({
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
    }, [viewStateContext]);  // check on viewStateContext change

    return (
        <ReactMapGl
            // Mapbox configuration
            mapStyle={'mapbox://styles/canardwc/clyyn8d2q00cl01r23wk58eqb'}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            // Layout styling
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                outline: 'none'
            }}
            // View state from context
            {...viewStateContext?.value}
            // Globe projection
            projection={{ name: 'globe' }}
            // Handle view state changes
            onMove={(event: ViewStateChangeEvent) => viewStateContext?.setValue(prev => ({
                ...prev,
                latitude: event.viewState.latitude,
                longitude: event.viewState.longitude,
                zoom: event.viewState.zoom,
                reRender: 1
            }))}
        >
            {children}
        </ReactMapGl>
    )
}