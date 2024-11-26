import { NextResponse } from 'next/server';
import { componentRegistry } from './componentRegistry';

export async function GET() {
    return NextResponse.json({ message: 'Success' });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        console.log('body', body);
        if (body.macroComponentName && body.macroComponentName in componentRegistry) {
            const render = componentRegistry[body.macroComponentName as keyof typeof componentRegistry]();
            console.log('render', render);
            return NextResponse.json({ message: 'Success', render });
        }
        return NextResponse.json({ message: 'Invalid macro component name' }, { status: 400 });
    } catch (error) {
        // Handle the case where the body is empty or invalid
        if (error instanceof SyntaxError) {
            return NextResponse.json({ message: 'Request body is empty or invalid' }, { status: 400 });
        }
        // Handle other errors
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}