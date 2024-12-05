import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export interface MapboxSuggestion {
    mapbox_id: string;
    name: string;
    full_address: string;
    coordinates?: [number, number];
}

interface MapboxResponse {
    suggestions: MapboxSuggestion[];
}

let adressAutoCompleteResponse: MapboxSuggestion[] = [];

function setAdressAutoCompleteResponse(response: MapboxSuggestion[]) {
    adressAutoCompleteResponse = response;
};

function getAdressAutoCompleteResponse() {
    return adressAutoCompleteResponse;
}; 

async function fetchSuggestions(searchText: string, latitude: number, longitude: number) {
    const url = new URL("https://api.mapbox.com/search/searchbox/v1/suggest");
    url.searchParams.append("q", searchText);
    url.searchParams.append("language", "fr");
    url.searchParams.append("limit", "5");
    url.searchParams.append("proximity", `${longitude},${latitude}`);
    url.searchParams.append("session_token", uuidv4());
    url.searchParams.append("access_token", process.env.MAPBOX_API_KEY ?? "");

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as MapboxResponse;
    setAdressAutoCompleteResponse(data.suggestions);
    return {status: 'success'};
}

export async function GET() {
    const suggestions = getAdressAutoCompleteResponse();
    return NextResponse.json(suggestions);
}

export async function POST(req: Request) {
    const body = await req.json();
    const response = await fetchSuggestions(body.inputValue, body.latitude, body.longitude);
    return NextResponse.json(response);
}