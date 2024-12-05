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
        // Create a variable to store the updated value
        let updatedValue;

        await new Promise<void>((resolve) => {
            onClickContext?.setValue((prev) => {
                updatedValue = {  // Capture the new value
                    ...prev,
                    ...newContextValue
                };
                resolve();
                return updatedValue;
            });
        });
        
        try {
            const response = await fetch(urlName, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedValue),  // Use the captured value
            });

            if (response.ok) {
                onClickContext?.setValue(prev => ({...prev, reRender: Math.random() }));
            }
        } catch (error) {
            console.error("Error posting context:", error);
        }
    };
}