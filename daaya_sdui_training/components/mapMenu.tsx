import { useState, useCallback, useRef } from "react";
import Button from "./button";
import Container from "./container";
import * as Icons from "./icons";
import Input from "./input";
import { v4 as uuidv4 } from 'uuid';

const IconComponents = Icons;

type Suggestion = {
    id: string;
    name: string;
    full_address: string;
}

async function fetchSuggestions(searchText: string, sessionToken: string) {
    const url = new URL("https://api.mapbox.com/search/searchbox/v1/suggest");
    url.searchParams.append("q", searchText);
    url.searchParams.append("language", "fr");
    url.searchParams.append("limit", "5");
    url.searchParams.append("session_token", sessionToken);
    url.searchParams.append("access_token", process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "");
    console.log('fetched suggestions')

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

    const debouncedSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(async () => {
                if (!value) {
                    setSearchSuggestions([]);
                    return;
                }

                try {
                    const data = await fetchSuggestions(value, sessionToken);
                    if (data?.suggestions) {
                        setSearchSuggestions(data.suggestions.map((item: Suggestion) => ({
                            id: item.id ?? uuidv4(),
                            name: item.name,
                            full_address: item.full_address,
                        })));
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    setSearchSuggestions([]);
                }
            }, 300);
        },
        [sessionToken]
    );

    return (
        <Container className='absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]'>
            <Container className='w-full h-fit flex flex-row items-center'>
                <Container className='w-full h-10 p-1 flex flex-row rounded-full items-center bg-[#eeeeee]'>
                    <IconComponents.SearchIcon className='w-[28px] h-[28px] fill-[#888888]' />
                    <Input 
                        type='search' 
                        placeholder='Localisation' 
                        className='w-full h-full text-xl bg-transparent outline-none'
                        onChange={debouncedSearch}
                    />
                </Container>
                <Button>
                    <IconComponents.FilterIcon className='w-[40px] h-[40px]' />
                </Button>
            </Container>
            {searchSuggestions.length > 0 && (
                <Container className='w-full h-fit overflow-hidden rounded-b-[24px]'>
                    {searchSuggestions.map((suggestion: Suggestion) => (
                    <Container key={suggestion.id} className="flex items-center gap-1 p-1 mt-1 w-full hover:bg-[#eeeeee]">
                        <IconComponents.LocationIcon className="w-5 h-5 flex-shrink-0" />
                        <Container className="flex flex-col w-full min-w-0">
                            <span className="w-full font-bold text-base truncate">{suggestion.name}</span>
                            <span className="w-full text-sm text-gray-600 truncate">{suggestion.full_address}</span>
                        </Container>
                    </Container>
                    ))}
                </Container>
            )}
            <Container className="w-full h-fit overflow-hidden rounded-b-[24px]">
                <Container className="w-full h-[600px]">

                </Container>
                <Container className="w-full h-fit p-1 flex flex-row justify-evenly">
                    <Button className="w-[100px] h-[40px]">
                        <span className="text-xl font-bold">Effacer</span>
                    </Button>
                    <Button className="w-[100px] h-[40px] text-white bg-black rounded-full">
                        <span className="text-xl font-bold">Filtrer</span>
                    </Button>
                </Container>
            </Container>
        </Container>
    );
}