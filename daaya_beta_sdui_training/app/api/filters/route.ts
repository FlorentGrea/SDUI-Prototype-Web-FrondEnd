import { NextResponse } from 'next/server';
import { MapPoint } from '@/types/map';
import PocketBase from 'pocketbase';

let filteredMapPoints: MapPoint[] = [];

function setFilteredMapPoints(response: MapPoint[]) {
    filteredMapPoints = response;
};

function getFilteredMapPoints() {
    return filteredMapPoints;
}; 

interface Filters {
    [key: string]: string | number | boolean;
}

async function fetchFilteredMapPoints(filters: Filters) {
    const pb = new PocketBase(process.env.DB_ADDR);
    const mapPoints: MapPoint[] = await pb.collection('MapPoints').getFullList({ next: { tags: ['mapPoints'] } });
    if (!mapPoints) {
        throw new Error(`Error fetching map points: ${mapPoints}`);
    }
    filteredMapPoints = mapPoints.filter((point: MapPoint) => {
        return Object.keys(filters).every(key => {
            return point[key as keyof MapPoint] === filters[key];
        });
    });
    setFilteredMapPoints(filteredMapPoints);
    return {status: 'success'};
}

export async function GET() {
    const suggestions = getFilteredMapPoints();
    return NextResponse.json(suggestions);
}

export async function POST(req: Request) {
    const body = await req.json();
    const response = await fetchFilteredMapPoints(body.filters);
    return NextResponse.json(response);
}