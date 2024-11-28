'use client'

import { Popup } from "react-map-gl";
import { useContainerContext } from "./Container/contextsGestion";

interface MapPopupProps {
    children: React.ReactNode;
    longitude: number;
    latitude: number;
    id: number;
}

export default function MapPopup({ children, longitude, latitude, id }: MapPopupProps) {
    const selectedId = useContainerContext('SelectedId');

    if (selectedId?.value?.id !== id) return null;

    return (
        <Popup
            closeButton={false}
            closeOnClick={false}
            closeOnMove={true}
            offset={20}
            onClose={() => {
                selectedId.setValue({id: 0});
            }}
            longitude={longitude}
            latitude={latitude}
            maxWidth='fit'
        >
            {children}
        </Popup>
    )
}