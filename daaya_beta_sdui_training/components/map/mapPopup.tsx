'use client'

import { Popup } from "react-map-gl";
import { useMapContext } from './map';
import { MapPoint } from "@/types/map";

export default function MapPopup({ children, point }: { children: React.ReactNode, point: MapPoint }) {
    const { selectedId, setSelectedId } = useMapContext();

    if (selectedId !== point.id) return null;

    return (
        <Popup
            closeButton={false}
            closeOnClick={false}
            closeOnMove={true}
            offset={20}
            onClose={() => {
                setSelectedId(0);
            }}
            longitude={point.longitude}
            latitude={point.latitude}
            maxWidth='fit'
        >
            {children}
        </Popup>
    )
}