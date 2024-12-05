'use client'

/**
 * Button Component with Dynamic Click Behaviors
 * 
 * This component extends the standard HTML button with additional functionality for
 * managing context and handling different click behaviors. It's designed to be flexible
 * and reusable across the application, supporting various actions like:
 * - Updating context values
 * - Handling Mapbox location interactions
 * - Making POST requests to specified URLs
 * 
 * The behavior is determined by the clickBehaviour prop and executed through
 * separate handler functions for better code organization.
 */

import { useContainerContext, ContextContainerObjectType } from "../container/contextsGestion";
import { DefineClickBehaviour } from "./clickBehaviors/clickBehaviours";

// Extends standard button props with custom properties for behavior management
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    clickBehaviour?: string      // Determines which click behavior to use
    clickContext?: string        // Specifies which context to modify
    newContextValue?: ContextContainerObjectType  // New values to update in context
    urlName?: string            // URL for POST requests when needed
};

export default function Button({
    clickBehaviour, 
    clickContext, 
    newContextValue, 
    urlName,
    children,
    ...props
}: ButtonProps) {
    // Get the context instance based on provided name or fallback to 'default'
    const onClickContext = useContainerContext(clickContext || 'default')
    
    // Initialize click handler with no-op function
    let onClickBehaviour = () => {}

    // Set up the click behavior if all required props are provided
    if (clickBehaviour && clickContext && newContextValue) 
        onClickBehaviour = DefineClickBehaviour(clickBehaviour, onClickContext, newContextValue, urlName)

    // Render button with all standard HTML button props plus our custom click handler
    return (
        <button {...props} onClick={onClickBehaviour}>
            {children}
        </button>
    )
}