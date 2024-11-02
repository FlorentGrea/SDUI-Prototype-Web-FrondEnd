'use client'

import { useMapContext } from "./map/map";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    dataId?: number;
};

function MapMarkerClickedButton({ children, dataId, ...props }: ButtonProps) {
    const { selectedId, setSelectedId } = useMapContext();
    
    return (
        <button {...props} className={`${props.className || ''} ${selectedId === dataId ? 'bg-black [&>svg]:fill-white' : 'bg-white [&>svg]:fill-black'}`} onClick={() => setSelectedId(dataId || 0)}>
            {children}
        </button>
    )
}

function MapPopupCloseButton({ children, ...props }: ButtonProps) {
    const { setSelectedId } = useMapContext();

    return (
        <button {...props} className={`${props.className || ''}`} onClick={() => setSelectedId(0)}>
            {children}
        </button>
    )
}

export default function Button({ children, variant, dataId, ...props }: ButtonProps) {
    
    if (variant === 'map_marker_clicked') {
        return (
            <MapMarkerClickedButton {...props} dataId={dataId}>
                {children}
            </MapMarkerClickedButton>
        )
    }

    if (variant === 'map_popup_close') {
        return (
            <MapPopupCloseButton {...props}>
                {children}
            </MapPopupCloseButton>
        )
    }

    return (
        <button {...props} className={`${props.className || ''}`}>
            {children}
        </button>
    )
}