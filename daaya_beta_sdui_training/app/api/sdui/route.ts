/**
 * SDUI API Route Handler
 * 
 * This module serves as the main API endpoint for Server-Driven UI (SDUI) requests.
 * It handles:
 * 1. Component rendering requests
 * 2. Dynamic UI structure generation
 * 3. Error handling for invalid requests
 * 4. Component registry integration
 */

import { NextResponse } from 'next/server';
import { componentRegistry } from './componentRegistry';

/**
 * GET endpoint - Basic health check
 * Returns a simple success message
 */
export async function GET() {
    return NextResponse.json({ message: 'Success' });
}

/**
 * POST endpoint - Main SDUI handler
 * Processes requests for UI components and returns their structure
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Validate request and check if component exists
        if (body.macroComponentName && body.macroComponentName in componentRegistry) {
            console.log('POST: macroComponentName', body.macroComponentName);
            // Get the component structure from registry and render it
            const render = await componentRegistry[body.macroComponentName as keyof typeof componentRegistry]();
            console.log('render', render);
            return NextResponse.json({ message: 'Success', render });
        }

        // Handle invalid component name
        return NextResponse.json({ message: 'Invalid macro component name' }, { status: 400 });
    } catch (error) {
        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return NextResponse.json({ message: 'Request body is empty or invalid' }, { status: 400 });
        }
        // Handle other unexpected errors
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}