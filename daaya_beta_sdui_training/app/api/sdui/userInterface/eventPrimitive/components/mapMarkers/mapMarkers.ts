import { MapPoint } from '@/types/map';
import PocketBase from 'pocketbase';

export default async function eventPrimitive() {
    const pb = new PocketBase(process.env.DB_ADDR);
    let mapPoints: MapPoint[] = [];

    try {
        mapPoints = await pb.collection('MapPoints').getFullList({ next: { tags: ['mapPoints'] } });
    } catch (error) {
        console.error("Error fetching map points:", error);
        // Handle the error appropriately, e.g., return a default value or throw an error
        // mapPoints = []; // Example: return an empty array or handle the error as needed
    }

    const markers = mapPoints.map((point: MapPoint) => ({
        type: 'MapMarker',
        props: {
            key: point.id,
            longitude: point.longitude,
            latitude: point.latitude,
        },
        children: [
            {
                type: 'Container',
                props: {
                    contextTiedTo: 'SelectedId',
                    existValue: {
                        include: 1,
                        id: point.id,
                    },
                },
                children: [
                    {
                        type: 'Button',
                        props: {
                            clickBehaviour: 'change_context',
                            clickContext: 'SelectedId',
                            newContextValue: {id: point.id},
                            className: `w-[40px] h-[28px] flex items-center justify-center shadow-[0px_0px_4px_1px_#00000060] rounded-full bg-white [&>svg]:fill-black`
                        },
                        children: [{type: point.type, props: {className: 'w-[20px] h-[20px]'}}]
                    },
                ]
            },
            {
                type: 'Container',
                props: {
                    contextTiedTo: 'SelectedId',
                    existValue: {
                        include: 0,
                        id: point.id,
                    },
                },
                children: [
                    {
                        type: 'Button',
                        props: {
                            clickBehaviour: 'change_context',
                            clickContext: 'SelectedId',
                            newContextValue: {id: 0},
                            className: `w-[40px] h-[28px] flex items-center justify-center shadow-[0px_0px_4px_1px_#00000060] rounded-full bg-black [&>svg]:fill-white`
                        },
                        children: [{type: point.type, props: {className: 'w-[20px] h-[20px]'}}]
                    },
                ]
            },
            {
                type: 'MapPopup',
                props: {latitude: point.latitude, longitude: point.longitude, id: point.id},
                children: [
                    {
                        type: 'Container',
                        props: {className: 'w-[500px] h-[160px] p-2 flex flex-row'},
                        children : [
                            {
                                type: 'Container',
                                props: {className: 'relative w-full h-full grid grid-cols-9 grid-rows-4 rounded-xl overflow-hidden bg-white shadow-[0px_0px_4px_1px_#00000050]'},
                                children: [
                                    {
                                        type: 'Image', 
                                        props: {
                                            src: point.images[0] ? process.env.DB_ADDR + 'api/files/' + point.collectionId + '/' + point.id + '/' + point.images[0] : '', 
                                            width: 1500, 
                                            height: 1500, 
                                            alt: point.title, 
                                            className: 'object-cover w-full h-full col-span-3 row-span-4 col-start-1 row-start-1'
                                        }
                                    },
                                    {
                                        type: 'Button',
                                        props: {
                                            clickBehaviour: 'change_context',
                                            clickContext: 'SelectedId',
                                            newContextValue: {id: 0},
                                            className: 'absolute top-2 left-2 flex items-center justify-center border-none rounded-full bg-[#00000040] w-[28px] h-[28px] focus:outline-none'
                                        },
                                        children: [{type: 'XIcon', props: {className: 'w-[20px] h-[20px] invert'}}]
                                    },
                                    {
                                        type: 'Text',
                                        props: {text: point.title, className: 'col-span-6 row-span-2 p-1 text-lg font-bold line-clamp-2 flex items-center'}
                                    },
                                    {
                                        type: 'Container',
                                        props: {className: 'flex flex-row col-span-4 row-start-3 col-start-4 p-1 items-center'},
                                        children: [{type: 'LocationIcon', props: {className: 'w-[20px] h-[20px]'}}, {type: 'Text', props: {text: point.location, className: 'font-bold text-base w-full truncate'}}]
                                    },
                                    {
                                        type: 'Container',
                                        props: {className: 'flex flex-row col-span-4 row-span-4 col-start-4 p-1 items-center'},
                                        children: [{type: 'CalendarIcon', props: {className: 'w-[20px] h-[20px]'}}, {type: 'Text', props: {text: new Date(point.date).toDateString(), className: 'font-bold text-base w-full truncate'}},]
                                    },
                                    {
                                        type: 'Container',
                                        props: {className: 'col-span-2 row-span-2 row-start-3 p-1'},
                                        children: [
                                            {
                                                type: 'Container', 
                                                props: {className: 'flex flex-col items-center justify-evenly w-full h-full rounded-xl text-base bg-black text-white'}, 
                                                children: [
                                                    {
                                                        type: 'Container', 
                                                        props: {className: 'flex flex-row items-center justify-center gap-1'}, 
                                                        children: [
                                                            {type: 'Text', props: {text: '3/4', className: 'font-bold text-base h-[20px]'}}, 
                                                            {type: 'TwoPeopleIcon', props: {className: 'w-[20px] h-[20px] invert'}}
                                                        ]
                                                    }, 
                                                    {type: 'Text', props: {text: '1000€', className: 'font-bold truncate w-fit'}}
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
        ]
    }))

    return {
        type: 'Container',
        props: {className: 'w-full h-full'},
        children: markers
    }
}