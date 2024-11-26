import { MapPoint } from '@/types/map';
import PocketBase from 'pocketbase';

export default async function eventPrimitive() {
    const pb = new PocketBase(process.env.DB_ADDR);
    const mapPoints: MapPoint[] = await pb.collection('MapPoints').getFullList({ next: { tags: ['mapPoints'] } })
    const markers = mapPoints.map((point: MapPoint) => ({
        type: 'MapMarker',
        props: {
            key: point.id,
            longitude: point.longitude,
            latitude: point.latitude,
        },
        children: [
            {
                type: 'MapPopup',
                props: {latitude: point.latitude, longitude: point.longitude, id: point.id},
                children: [
                    {
                        type: 'Container',
                        props: {className: 'w-[500px] h-[160px] p-2 flex flex-row bg-white'},
                    },
                ]
            },
        ]
    }))

    const render = {
        type: 'Container',
        props: {
            contexts: [
                {contextName: 'ViewState', contextValue: {
                    latitude: 46.2276,
                    longitude: 2.2137,
                    zoom: 4,
                }},
                {contextName: 'SelectedId', contextValue: {id: 0}},
            ],
            className: 'w-full h-screen',
        },
        children: [
            {
                type: 'Map',
                //children: markers
            },
        ],
    }

    return render
}