'use client'

import React, { useEffect, useState } from 'react';
import { MicroComponents } from './ComponentRegistry';

// Add this interface at the top of the file
interface ElementStructure {
    type: keyof typeof MicroComponents;  // Only allow valid component names
    props: {
        [key: string]: string  // For other dynamic props
    }
    children?: ElementStructure[]
}

// Function to get the structure of the macro component from the API
async function getStructure(macroComponentName: string) {
    const response = await fetch('/api/sdui', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ macroComponentName }), // Sending the macroComponentName as JSON
    })

    if (!response.ok) {
        throw new Error('Failed to get structure') // Error handling
    }

    return await response.json(); // Return the response data
}

interface RenderStructureProps {
    structure: ElementStructure;
}

interface ComponentProps {
    children?: React.ReactNode;
    [key: string]: string | number | boolean | React.ReactNode | undefined;
}

function RenderStructure({ structure }: RenderStructureProps) {
    const { type, props, children } = structure;
    const Component = MicroComponents[type] as React.ComponentType<ComponentProps>;

    return (
        <Component {...props} key={Math.random()}>
            {children?.map((child, index) => (
                <RenderStructure key={index} structure={child} />
            ))}
        </Component>
    );
}

interface SduiCallProps {
    macroComponentName: string;
}

export default function SduiCall({ macroComponentName }: SduiCallProps) {
    const [structure, setStructure] = useState(null);

    useEffect(() => {
        const fetchStructure = async () => {
            const fetchedStructure = await getStructure(macroComponentName);
            setStructure(fetchedStructure.render);
        };

        fetchStructure();
    }, [macroComponentName]);

    // Render only when structure is available
    if (!structure) {
        return <div>Loading...</div>; // Optional loading state
    }

    return <RenderStructure structure={structure} />;
}