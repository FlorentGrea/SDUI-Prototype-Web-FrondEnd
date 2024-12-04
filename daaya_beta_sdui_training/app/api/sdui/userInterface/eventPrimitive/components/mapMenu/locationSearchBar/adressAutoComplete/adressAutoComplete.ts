import { getIcon } from '@/app/api/sdui/userInterface/components/icons/getIcon';
import type { MapboxSuggestion } from '@/app/api/adressAutoComplete/route';

async function fetchSuggestions(): Promise<MapboxSuggestion[]> {
    try {
        const response = await fetch(`http://localhost:3000/api/adressAutoComplete`);
        if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
}}

export default async function adressAutoComplete() {
    const suggestions: MapboxSuggestion[] = await fetchSuggestions();

    const autocomplete = suggestions.map((suggestion, index) => {
        return ({
                type: 'Button',
                props: {
                    key: suggestion.mapbox_id || index,
                    clickBehaviour: 'mapbox_suggestion_click',
                    clickContext: 'ViewState',
                    newContextValue: {
                        mapbox_id: suggestion.mapbox_id,
                    },
                    className: "flex items-center gap-1 p-1 mt-1 w-full hover:bg-[#eeeeee] cursor-pointer",
                },
                children: [
                    getIcon('locationIcon', {className: 'w-5 h-5 flex-shrink-0'}),
                    {
                        type: 'Container', 
                        props: {className: 'flex flex-col w-full min-w-0'},
                        children: [{
                                type: 'Text', 
                                props: {
                                    text: suggestion.name, 
                                    className: 'w-full font-bold text-base truncate text-left'
                            }},{
                                type: 'Text', 
                                props: {
                                    text: suggestion.full_address, 
                                    className: 'w-full text-sm text-gray-600 truncate text-left'
    }}]}]})})
        
    return {
            type: 'Container',
            props: {
                contextTiedTo: 'ViewState',
                existValue: {
                    include: 1,
                    reRender: 1,
                },
                className: 'w-full h-fit overflow-hidden rounded-b-[24px]',
            },
            children: autocomplete
}}