'use client'

import React, { createContext, useContext, useState } from 'react';

// Define the context value type
type MyObjectType = {
    [key: string]: string | number; // Allow only strings or numbers as values
};

type ContextValue = {
    value: MyObjectType | null; // Change to the specific object type or null
    setValue: React.Dispatch<React.SetStateAction<MyObjectType | null>>; // Update setValue type
};

// Create a default context
const defaultContext = createContext<ContextValue | null>({ value: null, setValue: () => {} });

// Mapping of context names to context objects, including the default context
const contextMap: { [key: string]: React.Context<ContextValue | null> } = {
    default: defaultContext, // Add the default context
};

// Function to use a context from the contextMap
export function useContainerContext(contextName: string) {
    const context = contextMap[contextName];

    if (!context) {
        throw new Error(`${contextName} does not exist in contextMap, you have to create it before using it`);
    }

    const value = useContext(context);
    
    if (value === undefined) {
        throw new Error(`${contextName} must be used within his Provider`);
    }
    
    return value;
}

// Move NewProvider outside of addContexts
function NewProvider({ children, initialValue, contextName }: { 
    children: React.ReactNode; 
    initialValue: MyObjectType | null; 
    contextName: string 
}) {
    const [value, setValue] = useState<MyObjectType | null>(initialValue);
    const newContext = contextMap[contextName];
    return (
        <newContext.Provider value={{ value, setValue }}>
            {children}
        </newContext.Provider>
    );
}

// Update the addContexts function
export function addContexts(contexts: { contextName: string; contextValue?: MyObjectType }[]) {
    contexts.forEach(({ contextName }) => {
        if (contextMap[contextName]) {
            return
        }

        const newContext = createContext<ContextValue | null>(null);
        
        contextMap[contextName] = newContext;
    });

    return contexts.map(({ contextName, contextValue = null }) => ({
        name: contextName,
        provider: (props: { children: React.ReactNode }) => (
            <NewProvider {...props} initialValue={contextValue} contextName={contextName} />
        )
    }));
}