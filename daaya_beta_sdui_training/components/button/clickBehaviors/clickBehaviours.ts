/**
 * Click Behaviors Module
 * 
 * Central module for managing different click behaviors in the Button component.
 * It imports and orchestrates various click handlers, acting as a router to
 * determine which behavior should be executed based on the clickBehaviour parameter.
 * 
 * The module supports multiple click behaviors:
 * - change_context: Updates context values
 * - mapbox_suggestion_click: Handles Mapbox location interactions
 * - post_context: Manages POST requests to specified URLs
 */

import { HandleMapboxSuggestionClick } from "./mapboxSuggestionClick/mapboxSuggestionClick";
import { ContextContainerObjectType } from "@/components/container/contextsGestion";
import { ContextContainerType } from "@/components/container/contextsGestion";
import { handleChangeContext } from "./changeContext/changeContext";
import { handlePostContext } from "./postContext/postContext";

export function DefineClickBehaviour(
    clickBehaviour: string, // Identifier for the desired behavior
    onClickContext: ContextContainerType | null, // Context instance to be modified
    newContextValue: ContextContainerObjectType, // Values to be used in the behavior
    urlName?: string // Optional URL for POST requests
): () => void | Promise<void> {
    // Route to context change handler
    if (clickBehaviour === 'change_context') {
        return handleChangeContext(onClickContext, newContextValue)
    }

    // Route to Mapbox suggestion handler
    if (clickBehaviour === 'mapbox_suggestion_click') {
        return HandleMapboxSuggestionClick(newContextValue, onClickContext)
    }

    // Route to POST request handler
    if (clickBehaviour === 'post_context') {
        return handlePostContext(urlName, newContextValue)
    }

    // Default no-op function when no behavior matches
    return () => {}
}