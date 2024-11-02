import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./container";
import Button from "./button";

type Suggestion = {
    id: string;
    name: string;
    full_address: string;
};

async function fetchSuggestions(searchText: string, sessionToken: string) {
    const url = new URL("https://api.mapbox.com/search/searchbox/v1/suggest");
    url.searchParams.append("q", searchText);
    url.searchParams.append("language", "fr");
    url.searchParams.append("limit", "5");
    url.searchParams.append("session_token", sessionToken);
    url.searchParams.append("access_token", process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "");
    console.log('fetching suggestions')

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

function MapMenu() {
    const [sessionToken] = useState(uuidv4());
    const [searchSuggestions, setSearchSuggestions] = useState<Suggestion[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout>();

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
        <Container className="absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]">
            <Container className="w-full h-fit flex flex-row items-center">
                <Container className="w-full h-10 p-1 flex flex-row rounded-full items-center bg-[#eeeeee]">
                    <svg className="w-[28px] h-[28px] fill-[#888888]" fill="#000000" viewBox="0 0 256.00098 256.00098">
                        <path d="M232.47656,215.51563l-40.67773-40.67774a96.10791,96.10791,0,1,0-16.97168,16.96973l40.67871,40.67871a12.0001,12.0001,0,1,0,16.9707-16.9707ZM43.99707,116a72,72,0,1,1,72,72A72.08124,72.08124,0,0,1,43.99707,116Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Localisation"
                        className="w-full h-full text-xl bg-transparent outline-none"
                        onChange={debouncedSearch}
                    />
                </Container>
                <Button>
                    <svg className="w-[40px] h-[40px]" fill="#000000" viewBox="0 0 256 256">
                        <path d="M227.99951,171.99353a12.00028,12.00028,0,0,1-12,12H197.65625a31.98806,31.98806,0,0,1-59.31348,0H39.99951a12,12,0,0,1,0-24h98.34326a31.98806,31.98806,0,0,1,59.31348,0h18.34326A12.00028,12.00028,0,0,1,227.99951,171.99353ZM39.999,95.99255l34.34375.00074a31.988,31.988,0,0,0,59.31348.00024L216,95.99255a12,12,0,0,0-.001-24l-82.34277.001a31.98813,31.98813,0,0,0-59.31348-.00024L40,71.99255h-.00049a12,12,0,0,0-.00049,24Z" />
                    </svg>
                </Button>
            </Container>
            <Container className="w-full h-fit overflow-hidden rounded-b-[24px]">
                {searchSuggestions.map((suggestion, index) => (
                    <Container key={suggestion.id || index} className="flex items-center gap-1 p-1 mt-1 w-full hover:bg-[#eeeeee]">
                        <svg className="w-5 h-5 flex-shrink-0" fill="#000000" viewBox="0 0 256 256">
                            <path d="M199.99975,220H160.73437c5.17652-4.97607,10.74146-10.70947,16.321-17.126,28.09472-32.30859,42.94433-66.499,42.94433-98.874a92,92,0,0,0-184,0c0,50.01221,34.11963,91.94238,59.18408,116H55.99975a12,12,0,0,0,0,24h144a12,12,0,0,0,0-24Zm-140-116a68,68,0,0,1,136,0c0,33.31055-19.95605,63.36621-36.69824,82.71387a249.0586,249.0586,0,0,1-31.30176,30.17138A249.0053,249.0053,0,0,1,96.698,186.71387C79.95581,167.36621,59.99975,137.31055,59.99975,104Zm68,44a44,44,0,1,0-44-44A44.04978,44.04978,0,0,0,127.99975,148Zm0-64a20,20,0,1,1-20,20A20.02229,20.02229,0,0,1,127.99975,84Z" />
                        </svg>
                        <Container className="flex flex-col w-full min-w-0">
                            <span className="w-full font-bold text-base truncate">{suggestion.name}</span>
                            <span className="w-full text-sm text-gray-600 truncate">{suggestion.full_address}</span>
                        </Container>
                    </Container>
                ))}
            </Container>
        </Container>
    );
}

export default MapMenu;