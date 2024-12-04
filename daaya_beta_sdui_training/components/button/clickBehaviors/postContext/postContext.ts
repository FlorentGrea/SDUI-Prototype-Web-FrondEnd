/**
 * Post Context Handler
 * 
 * This module provides a function to handle the 'post_context' behavior for buttons.
 * It sends a POST request to a specified URL with the provided context data.
 * This is useful for updating server-side data or triggering server-side actions
 * based on client-side interactions.
 */

import { ContextContainerObjectType, ContextContainerType } from "../../../container/contextsGestion";

export function handlePostContext(
    urlName: string | undefined, // URL for POST requests
    onClickContext: ContextContainerType | null = null, // The context instance to be updated
    newContextValue: ContextContainerObjectType = {} // Values to be used in the behavior
): () => void | Promise<void> {
    // Check if URL is provided; if not, log an error and return a no-op function
    if (!urlName) {
        console.error("URL name is required for post_context behavior.");
        return () => {};
    }

    // Return an asynchronous function to perform the POST request
    return async () => {
        onClickContext?.setValue((prev) => ({
            ...prev, // Spread the existing context values
            ...newContextValue // Merge in the new context values
        }));

        try {
            // Send POST request with context data as JSON
            const response = await fetch(urlName, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(onClickContext?.value),
            });

            if (response.ok) {
                onClickContext?.setValue(prev => ({...prev, reRender: Math.random() }));
            }
            console.log('reRender', onClickContext?.value?.reRender);
        } catch (error) {
            // Log any errors that occur during the request
            console.error("Error posting context:", error);
        }
    };
}