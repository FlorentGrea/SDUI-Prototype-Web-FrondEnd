import { NextResponse } from 'next/server';
import { MapPoint } from '@/types/map';
import PocketBase from 'pocketbase';

let eventPicked: MapPoint = {id: 'd', longitude: 0, latitude: 0, type: '', images: [], date: '', collectionId: '', title: '', location: ''};

async function fetchEventPicked(id: string) {
    const pb = new PocketBase(process.env.DB_ADDR);
    eventPicked = await pb.collection('MapPoints').getOne(id);
    if (!eventPicked) {
        throw new Error(`Error fetching event picked: ${eventPicked}`);
    }
    return {status: 'success'};
}

export async function GET() {
    return NextResponse.json(eventPicked);
}

export async function POST(req: Request) {
    const body = await req.json();
    console.log('body', body);
    const response = await fetchEventPicked(body.selectedId);
    return NextResponse.json(response);
}