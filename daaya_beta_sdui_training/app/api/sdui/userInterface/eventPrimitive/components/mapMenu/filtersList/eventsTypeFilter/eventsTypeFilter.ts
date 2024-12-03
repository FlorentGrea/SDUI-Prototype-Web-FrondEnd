import { getIcon } from '@/app/api/sdui/userInterface/components/icons/getIcon';
import { MapPoint } from '@/types/map';
import PocketBase from 'pocketbase';

export default async function eventsTypeFilter() {
    const pb = new PocketBase(process.env.DB_ADDR);
    let uniqueTypes: Set<string> = new Set();

    const typesName = {
        'BedIcon': 'Coliving',
        'BicycleIcon': 'Bicycle Trip',
        'BoatIcon': 'Boat Trip',
        'MeetIcon': 'Meeting',
        'VanIcon': 'Car Trip',
    };

    try {
        const mapPoints: MapPoint[] = await pb.collection('MapPoints').getFullList({ next: { tags: ['mapPoints'] } });
        uniqueTypes = new Set(mapPoints.map(point => point.type));
    } catch (error) {
        console.error("Error fetching map points:", error);
    }

    const typeFilters = Array.from(uniqueTypes).map(type => (
        {
            type: 'Container',
            props: {
                contexts: [{'contextName': 'activityFilter', 'contextValue': {[type + 'Clicked']: 0}}],
                className: 'w-full aspect-square',
            },
            children: [
                {
                    type: 'Container',
                    props: {
                        contextTiedTo: 'activityFilter',
                        existValue: {
                            include: 0,
                            [type + 'Clicked']: 1,
                        },
                        className: 'w-full aspect-square',
                    },
                    children: [
                        {
                            type: 'Button',
                            props: {
                                clickBehaviour: 'change_context',
                                clickContext: 'activityFilter',
                                newContextValue: {[type + 'Clicked']: 0},
                                className: 'aspect-square w-full border-4 border-black rounded-lg font-bold flex flex-col items-center justify-center',
                            },
                            children: [
                                getIcon(type, {className: 'w-[28px] h-[28px]'}),
                                {type: 'Text', props: {text: typesName[type as keyof typeof typesName], className: 'text-center'}},
                ]}]},
                {
                    type: 'Container',
                    props: {
                        contextTiedTo: 'activityFilter',
                        existValue: {
                            include: 0,
                            [type + 'Clicked']: 0,
                        },
                        className: 'w-full aspect-square',
                    },
                    children: [
                        {
                            type: 'Button',
                            props: {
                                clickBehaviour: 'change_context',
                                clickContext: 'activityFilter',
                                newContextValue: {[type + 'Clicked']: 1},
                                className: 'aspect-square w-full bg-black text-white rounded-lg font-bold flex flex-col items-center justify-center',
                            },
                            children: [
                                getIcon(type, {className: 'w-[28px] h-[28px] fill-white'}),
                                {type: 'Text', props: {text: typesName[type as keyof typeof typesName], className: 'text-center'}},
    ]}]}]}));

    return {
        type: 'Container',
        props: {
            contexts: [{'contextName': 'activityFilter', 'contextValue': {clicked: 0}}],
            className: 'w-full h-fit p-2 gap-2 flex flex-col justify-center',
        },
        children: [
            {type: 'Container', props: {className: 'w-full h-[1px] bg-[#00000020]'}},
            {
                type: 'Container',
                props: {
                    contextTiedTo: 'activityFilter',
                    existValue: {
                        include: 0,
                        clicked: 0,
                }},
                children: [
                    {
                        type: 'Button',
                        props: {
                            clickBehaviour: 'change_context',
                            clickContext: 'activityFilter',
                            newContextValue: {clicked: 1},
                            className: 'w-full h-fit flex flex-row justify-between',
                        },
                        children: [
                            {type: 'Text', props: {text: 'Types d\'activités', className: 'text-xl font-bold h-[28px] flex items-center'}},
                            getIcon('downArrowIcon', {className: 'w-[28px] h-[28px]'})
            ]}]},
            {
                type: 'Container',
                props: {
                    contextTiedTo: 'activityFilter',
                    existValue: {
                        include: 0,
                        clicked: 1,
                }},
                children: [
                    {
                        type: 'Button',
                        props: {
                            clickBehaviour: 'change_context',
                            clickContext: 'activityFilter',
                            newContextValue: {clicked: 0},
                            className: 'w-full h-fit flex flex-row justify-between',
                        },
                        children: [
                            {type: 'Text', props: {text: 'Types d\'activités', className: 'text-xl font-bold h-[28px] flex items-center'}},
                            getIcon('upArrowIcon', {className: 'w-[28px] h-[28px]'})
            ]}]},
            {
                type: 'Container',
                props: {
                    contextTiedTo: 'activityFilter',
                    existValue: {
                        include: 0,
                        clicked: 1,
                    },
                    className: 'grid grid-cols-4 gap-2 justify-items-center'
                },
                children: typeFilters
}]}}