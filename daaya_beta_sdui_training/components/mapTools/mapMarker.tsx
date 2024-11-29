/**
 * Map Marker Component
 * 
 * A wrapper around react-map-gl's Marker component that:
 * - Simplifies marker creation
 * - Provides type safety
 * - Supports custom marker content
 * - Maintains all Marker functionality
 */

import { Marker, MarkerProps } from 'react-map-gl';

/**
 * MapMarker component for displaying markers on the map
 * @param children - Content to display inside the marker (icons, images, etc.)
 * @param props - Standard MarkerProps from react-map-gl (longitude, latitude, etc.)
 */
export default function MapMarker({ 
    children, 
    ...props 
}: { 
    children: React.ReactNode 
} & MarkerProps) {
    return (
        <Marker {...props}>
            {children}
        </Marker>
    )
}