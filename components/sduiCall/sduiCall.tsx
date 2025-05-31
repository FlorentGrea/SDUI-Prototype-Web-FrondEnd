'use client'

import React, { useEffect, useState } from 'react';
import { MicroComponents } from './componentRegistry';
import { useContainerContext } from '../container/contextsGestion';

interface ElementStructure {
    type: keyof typeof MicroComponents;  // Only allow valid component names
    properties: {
        [key: string]: string  // For other dynamic props
    }
    children?: ElementStructure[]
}

// Function to get the structure of the macro component from the API
async function getStructure(urlName: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ui/${urlName}`, {
        method: 'GET',
    });
    console.log(response.status, response.statusText);

    if (!response.ok) {
        throw new Error('Failed to get structure: ' + urlName); // Error handling
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
    const { type, properties, children } = structure;
    const Component = MicroComponents[type] as React.ComponentType<ComponentProps>;

    return (
        <Component {...properties} key={Math.random()}>
            {children?.map((child, index) => (
                <RenderStructure key={index} structure={child} />
            ))}
        </Component>
    );
}

interface SduiCallProps {
    urlName: string;
    context?: string;
    urlValue?: string;
}

export default function SduiCall({ urlName, context, urlValue }: SduiCallProps) {
    const renderContext = useContainerContext(context || 'default');

    const [structure, setStructure] = useState<ElementStructure[] | null>(null);

    useEffect(() => {
        async function fetchStructure() {
            let finalUrlName = urlName;

            if (urlValue === 'all') {
                const queryValue = JSON.stringify(renderContext?.value);
                finalUrlName = `${urlName}${encodeURIComponent(queryValue)}`;
            }

            if (urlValue && renderContext?.value?.[urlValue] !== undefined) {
                const value = renderContext.value[urlValue];
                let queryValue = '';
    
                if (typeof value === 'number' || typeof value === 'string') {
                    queryValue = String(value);
                } else if (Array.isArray(value)) {
                    queryValue = JSON.stringify(value);
                } else if (typeof value === 'object') {
                    queryValue = JSON.stringify(value);
                }

                finalUrlName = `${urlName}${encodeURIComponent(queryValue)}`;
            }
            const fetchedStructure = await getStructure(finalUrlName);
            setStructure(fetchedStructure);
        };

        fetchStructure();
    }, [renderContext?.value?.reRender]);

    // Render only when structure is available
    if (!structure) {
        return <></>; // Optional loading state
    }

    return (
        <>
            {structure.map((componentStructure, index) => (
                <RenderStructure key={index} structure={componentStructure} />
            ))}
        </>
    );
}