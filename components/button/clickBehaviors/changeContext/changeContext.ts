/**
 * Change Context Handler
 * 
 * This function provides a mechanism to update the context with new values.
 * It returns a function that, when executed, merges the new context values
 * with the existing ones, allowing for dynamic updates to the application state.
 */

import { ContextContainerObjectType, ContextContainerType } from "@/components/container/contextsGestion";

export function handleChangeContext(
    onClickContext: ContextContainerType | null = null,
    newContextValue: ContextContainerObjectType = {}
): () => void {
    return () => onClickContext?.setValue((prev: ContextContainerObjectType | null) => {
        // Create a copy of newContextValue to modify
        const processedContextValue = { ...newContextValue };
        
        // Check if reRender is 'Random' and transform it
        if (processedContextValue.reRender === 'Random') {
            processedContextValue.reRender = Math.random();
        }

        return {
            ...prev,
            ...processedContextValue
        };
    });
}