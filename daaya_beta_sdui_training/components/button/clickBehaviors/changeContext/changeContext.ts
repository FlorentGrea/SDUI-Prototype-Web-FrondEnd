/**
 * Change Context Handler
 * 
 * This function provides a mechanism to update the context with new values.
 * It returns a function that, when executed, merges the new context values
 * with the existing ones, allowing for dynamic updates to the application state.
 */

import { ContextContainerObjectType, ContextContainerType } from "@/components/container/contextsGestion";

export function handleChangeContext(
    onClickContext: ContextContainerType | null = null, // The context instance to be updated
    newContextValue: ContextContainerObjectType = {} // The new values to merge into the existing context
): () => void {
    // Return a function that updates the context
    return () => onClickContext?.setValue((prev: ContextContainerObjectType | null) => ({
        ...prev, // Spread the existing context values
        ...newContextValue // Merge in the new context values
    }));
}