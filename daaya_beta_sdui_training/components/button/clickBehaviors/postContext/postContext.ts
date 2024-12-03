/**
 * Post Context Handler
 * 
 * This module provides a function to handle the 'post_context' behavior for buttons.
 * It sends a POST request to a specified URL with the provided context data.
 * This is useful for updating server-side data or triggering server-side actions
 * based on client-side interactions.
 */

import { ContextContainerObjectType } from "../../../container/contextsGestion";

export function handlePostContext(
    urlName: string | undefined, // URL for POST requests
    newContextValue: ContextContainerObjectType // Values to be used in the behavior
): () => void | Promise<void> {
    // Check if URL is provided; if not, log an error and return a no-op function
    if (!urlName) {
        console.error("URL name is required for post_context behavior.");
        return () => {};
    }

    // Return an asynchronous function to perform the POST request
    return async () => {
        try {
            // Send POST request with context data as JSON
            const response = await fetch(urlName, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContextValue),
            });

            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`Error posting context: ${response.statusText}`);
            }

            // Parse and log the response data if the request is successful
            const data = await response.json();
            console.log("Context posted successfully:", data);
        } catch (error) {
            // Log any errors that occur during the request
            console.error("Error posting context:", error);
        }
    };
}