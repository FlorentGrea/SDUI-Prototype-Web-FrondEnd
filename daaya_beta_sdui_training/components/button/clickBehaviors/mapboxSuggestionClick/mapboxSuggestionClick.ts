/**
 * Mapbox Suggestion Click Handler
 * 
 * This module provides a function to handle the 'mapbox_suggestion_click' behavior.
 * It retrieves location details from the Mapbox API based on a suggestion click,
 * updates the context with the new location, and adjusts the map view accordingly.
 */

import { ContextContainerObjectType, ContextContainerType } from "@/components/container/contextsGestion";
import { useMap } from "react-map-gl";
import { v4 as uuidv4 } from 'uuid';

export function HandleMapboxSuggestionClick(
    newContextValue: ContextContainerObjectType, // Contains the Mapbox ID for the location
    onClickContext: ContextContainerType | null // The context to be updated with new location data
): () => void | Promise<void> {
    // Access map functions from react-map-gl
    const mapFunctions = useMap();

    // Return an asynchronous function to handle the suggestion click
    return async () => {
        try {
            // Construct the URL for the Mapbox API request
            const url = new URL(`https://api.mapbox.com/search/searchbox/v1/retrieve/${newContextValue.mapbox_id}`);
            url.searchParams.append("session_token", uuidv4()); // Add a unique session token
            url.searchParams.append("access_token", process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? ""); // Add the Mapbox API key
            
            // Fetch location details from the Mapbox API
            const response = await fetch(url);
            const data = await response.json();

            // Check if the response contains valid coordinates
            if (data.features?.[0]?.geometry?.coordinates) {
                const [longitude, latitude] = data.features[0].geometry.coordinates;
                
                // Update the context with new latitude and longitude
                onClickContext?.setValue((prev: ContextContainerObjectType | null) => ({
                    ...prev, 
                    latitude, 
                    longitude
                }));

                // Adjust the map view to the new location
                mapFunctions?.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: 10
                });
            }
        } catch (error) {
            // Log any errors that occur during the fetch
            console.error("Error fetching location details:", error);
        }
    }
}