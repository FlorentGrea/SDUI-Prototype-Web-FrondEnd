/**
 * Enhanced Button Component
 * 
 * A flexible button component that extends HTML button functionality with:
 * 1. Context-aware click behaviors
 * 2. Mapbox location integration
 * 3. Dynamic state management
 * 4. Custom event handling
 */

'use client'

import { useMap } from "react-map-gl";
import { useContainerContext, ContextContainerObjectType, ContextContainerType } from "../container/contextsGestion";
import { v4 as uuidv4 } from 'uuid';

// Type definition for Mapbox location suggestions
export interface MapboxSuggestion {
    mapbox_id: string;
    name: string;
    full_address: string;
    coordinates?: [number, number];
}

/**
 * Defines different click behaviors for the button
 * Returns a function that will be called on button click
 */
function DefineClickBehaviour(
    clickBehaviour: string, 
    onClickContext: ContextContainerType | null, 
    newContextValue: ContextContainerObjectType
): () => void | Promise<void> {
    const mapFunctions = useMap();

    // Simple context update behavior
    if (clickBehaviour === 'change_context') {
        return () => onClickContext?.setValue((prev: ContextContainerObjectType | null) => ({
            ...prev, 
            ...newContextValue
        }));
    }

    // Complex Mapbox location handling behavior
    if (clickBehaviour === 'mapbox_suggestion_click') {
        return async () => {
            try {
                // Fetch detailed location data from Mapbox API
                const url = new URL(`https://api.mapbox.com/search/searchbox/v1/retrieve/${newContextValue.mapbox_id}`);
                url.searchParams.append("session_token", uuidv4());
                url.searchParams.append("access_token", process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "");
                
                const response = await fetch(url);
                const data = await response.json();

                // Update map view if coordinates are available
                if (data.features?.[0]?.geometry?.coordinates) {
                    const [longitude, latitude] = data.features[0].geometry.coordinates;
                    onClickContext?.setValue((prev: ContextContainerObjectType | null) => ({
                        ...prev, 
                        latitude, 
                        longitude
                    }));
                    // Animate map to new location
                    mapFunctions?.current?.flyTo({
                        center: [longitude, latitude],
                        zoom: 10
                    });
                }
            } catch (error) {
                console.error("Error fetching location details:", error);
            }
        };
    }

    return () => {};  // Default no-op function
}

// Props type definition extending HTML button props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    dataId?: number;
    clickBehaviour?: string;
    clickContext?: string;
    newContextValue?: ContextContainerObjectType;
};

/**
 * Button component with enhanced functionality
 * Handles both simple and complex click behaviors
 */
export default function Button({
    children, 
    clickBehaviour, 
    clickContext, 
    newContextValue, 
    ...props
}: ButtonProps) {
    const onClickContext = useContainerContext(clickContext || 'default');

    // Set up click behavior based on props
    let onClickBehaviour = () => {};
    if (clickBehaviour && clickContext && newContextValue) 
        onClickBehaviour = DefineClickBehaviour(clickBehaviour, onClickContext, newContextValue);

    return (
        <button {...props} onClick={onClickBehaviour}>
            {children}
        </button>
    )
}