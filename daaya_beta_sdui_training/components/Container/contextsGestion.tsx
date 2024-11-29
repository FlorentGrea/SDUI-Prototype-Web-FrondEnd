/**
 * Context Management System
 * 
 * This module provides a flexible context management system for the SDUI framework.
 * It allows for:
 * 1. Dynamic creation and management of contexts
 * 2. Type-safe context values and setters
 * 3. Centralized context registry
 * 4. Easy context access through hooks
 */

'use client'

import React, { createContext, useContext, useState } from 'react';

// Define the shape of values that can be stored in contexts
export type ContextContainerObjectType = {
    [key: string]: string | number; // Only allow string or number values for type safety
};

// Define the shape of the context itself, including value and setter
export type ContextContainerType = {
    value: ContextContainerObjectType | null;
    setValue: React.Dispatch<React.SetStateAction<ContextContainerObjectType | null>>;
};

// Create a default context with null value and empty setter
const defaultContext = createContext<ContextContainerType | null>({ 
    value: null, 
    setValue: () => {} 
});

// Registry of all contexts, initialized with default context
const contextMap: { [key: string]: React.Context<ContextContainerType | null> } = {
    default: defaultContext,
};

/**
 * Hook to access context values
 * Throws helpful errors if context doesn't exist or is used outside provider
 */
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

/**
 * Provider component that manages state for a context
 * Handles initialization and state updates for a specific context
 */
function NewProvider({ children, initialValue, contextName }: { 
    children: React.ReactNode; 
    initialValue: ContextContainerObjectType | null; 
    contextName: string 
}) {
    const [value, setValue] = useState<ContextContainerObjectType | null>(initialValue);
    const newContext = contextMap[contextName];
    return (
        <newContext.Provider value={{ value, setValue }}>
            {children}
        </newContext.Provider>
    );
}

/**
 * Creates new contexts and returns their providers
 * Used by Container component to set up context hierarchy
 */
export function addContexts(contexts: { contextName: string; contextValue?: ContextContainerObjectType }[]) {
    // Create contexts if they don't exist
    contexts.forEach(({ contextName }) => {
        if (contextMap[contextName]) {
            return
        }
        const newContext = createContext<ContextContainerType | null>(null);
        contextMap[contextName] = newContext;
    });

    // Return array of provider components
    return contexts.map(({ contextName, contextValue = null }) => ({
        name: contextName,
        provider: (props: { children: React.ReactNode }) => (
            <NewProvider {...props} initialValue={contextValue} contextName={contextName} />
        )
    }));
}