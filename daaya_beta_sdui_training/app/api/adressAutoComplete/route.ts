import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

async function fetchSuggestions(searchText: string, latitude: number, longitude: number) {
    console.log('searchText', searchText, 'latitude', latitude, 'longitude', longitude);
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
    return response.json();
}

export async function POST(req: Request) {
    const body = await req.json();
    const suggestions = await fetchSuggestions(body.inputValue, body.latitude, body.longitude);
    return NextResponse.json({ suggestions });
}