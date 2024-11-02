import { Marker, MarkerProps } from 'react-map-gl';

export default function MapMarker({ children, ...props }: { children: React.ReactNode } & MarkerProps) {
    return (
        <Marker {...props}>
            {children}
        </Marker>
    )
}