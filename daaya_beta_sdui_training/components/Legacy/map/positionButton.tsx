import { useMap } from "react-map-gl";
import Button from "../../button/button";
import * as Icons from "../../icons/icons";

export default function PositionButton() {
    const mapFunctions = useMap();

    const handleLocationClick = () => {
        const map = mapFunctions?.current;
        if (!map) return;
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    map.flyTo({
                        center: [position.coords.longitude, position.coords.latitude],
                        zoom: 6
                    });
                },
                (error) => {
                    console.log("Error getting location:", error);
                }
            );
        }
    };

    return (
        <Button 
            onClick={handleLocationClick}
            className="absolute bottom-[60px] left-[60px] w-10 h-10 flex items-center justify-center bg-white shadow-[0px_0px_4px_1px_#00000060] rounded-full"
        >
            <Icons.PositionIcon className="w-7 h-7" />
        </Button>
    )
}