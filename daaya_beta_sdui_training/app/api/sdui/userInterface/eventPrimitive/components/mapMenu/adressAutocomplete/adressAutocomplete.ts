export default function adressAutocomplete() {

    const autocomplete = [
        {type: 'Text', props: {text: '1000€', className: 'font-bold truncate w-fit'}},
    ]

    return {
        type: 'Container',
        props: {className: 'w-full h-full'},
        children: autocomplete
    }
}/*import { useState, useCallback, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "../../container";
import Button from "../../button";
import * as Icons from "../../icons";
import { useMapContext } from '../map';
import { useMap } from "react-map-gl";
import PriceFilter from "./priceFilter";
import LanguageFilter from "./languageFilter";

type Suggestion = {
    mapbox_id: string;
    name: string;
    full_address: string;
    coordinates?: [number, number];
};

const IconComponents = Icons

async function fetchSuggestions(searchText: string, sessionToken: string, latitude: number, longitude: number) {
    const url = new URL("https://api.mapbox.com/search/searchbox/v1/suggest");
    url.searchParams.append("q", searchText);
    url.searchParams.append("language", "fr");
    url.searchParams.append("limit", "5");
    url.searchParams.append("proximity", `${longitude},${latitude}`);
    url.searchParams.append("session_token", sessionToken);
    url.searchParams.append("access_token", process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "");

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export default function MapMenu() {
    const [sessionToken] = useState(uuidv4());
    const [searchSuggestions, setSearchSuggestions] = useState<Suggestion[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [filterPage, setFilterPage] = useState(false);
    const [activityFilter, setActivityFilter] = useState(false);
    const [priceFilter, setPriceFilter] = useState(false);
    const [languageFilter, setLanguageFilter] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { viewState } = useMapContext();
    const [position, setPosition] = useState({ latitude: viewState.latitude, longitude: viewState.longitude });
    const mapFunctions = useMap();
    const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setFilterPage(false);
                setSearchSuggestions([]);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const debouncedSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            
            // Clear existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set new timeout
            timeoutRef.current = setTimeout(async () => {
                if (!value) {
                    setSearchSuggestions([]);
                    return;
                }

                try {
                    const data = await fetchSuggestions(
                        value, 
                        sessionToken, 
                        position.latitude, 
                        position.longitude
                    );
                    if (data?.suggestions) {
                        setSearchSuggestions(data.suggestions.map((item: Suggestion) => ({
                            mapbox_id: item.mapbox_id ?? uuidv4(),
                            name: item.name,
                            full_address: item.full_address,
                            coordinates: item.coordinates,
                        })));
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    setSearchSuggestions([]);
                }
            }, 300);
        },
        [sessionToken, position]
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            debouncedSearch(e as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <Container 
            ref={menuRef}
            className="absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]"
        >
            <>
                <Container className="w-full h-fit flex flex-row items-center">
                    <Container className="w-full h-10 p-1 flex flex-row rounded-full items-center bg-[#eeeeee]">
                        <IconComponents.SearchIcon className="w-[28px] h-[28px] fill-[#888888]" />
                        <input
                            type="search"
                            placeholder="Localisation"
                            className="w-full h-full text-xl bg-transparent outline-none"
                            onChange={debouncedSearch}
                            onFocus={handleFocus}
                        />
                    </Container>
                    <Button onClick={() => setFilterPage(!filterPage)}>
                        <IconComponents.FilterIcon className="w-[40px] h-[40px]" />
                    </Button>
                </Container>
                <Container className="w-full h-fit overflow-hidden rounded-b-[24px]">
                    {searchSuggestions.map((suggestion, index) => (
                        <Container 
                            key={suggestion.mapbox_id || index} 
                            className="flex items-center gap-1 p-1 mt-1 w-full hover:bg-[#eeeeee] cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <IconComponents.LocationIcon className="w-5 h-5 flex-shrink-0" />
                            <Container className="flex flex-col w-full min-w-0">
                                <span className="w-full font-bold text-base truncate">{suggestion.name}</span>
                                <span className="w-full text-sm text-gray-600 truncate">{suggestion.full_address}</span>
                            </Container>
                        </Container>
                    ))}
                </Container>
            </>
        </Container>
    );
}*/