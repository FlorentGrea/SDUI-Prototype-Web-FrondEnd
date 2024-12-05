/**
 * Map Popup Component
 * 
 * A context-aware popup component for maps that:
 * - Shows/hides based on selected item state
 * - Handles positioning and offset
 * - Manages popup lifecycle
 * - Provides customizable content
 */

'use client'  // Mark as client component for Next.js

import { Popup } from "react-map-gl";
import { useContainerContext } from "../container/contextsGestion";

/**
 * Props interface for MapPopup
 * @property children - Content to display inside the popup
 * @property longitude - Popup's longitude position
 * @property latitude - Popup's latitude position
 * @property id - Unique identifier to match with selected item
 */
interface MapPopupProps {
    children: React.ReactNode;
    longitude: number;
    latitude: number;
    id: number;
}

export default function MapPopup({ children, longitude, latitude, id }: MapPopupProps) {
    // Get selected item state from context
    const selectedId = useContainerContext('SelectedId');

    // Only render popup if its id matches the selected id
    if (selectedId?.value?.id !== id) return null;

    return (
        <Popup
            // Popup configuration
            closeButton={false}     // Hide default close button
            closeOnClick={false}    // Don't close when clicking popup
            closeOnMove={true}      // Close when map moves
            offset={20}             // Offset from anchor point
            
            // Handle popup close
            onClose={() => {
                selectedId.setValue({id: 0});  // Reset selected id
            }}
            
            // Position
            longitude={longitude}
            latitude={latitude}
            
            // Styling
            maxWidth='fit'          // Allow content to determine width
        >
            {children}
        </Popup>
    )
}