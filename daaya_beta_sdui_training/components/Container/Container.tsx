/**
 * Container Component
 * 
 * A flexible wrapper component that provides context management and conditional rendering.
 * It can:
 * 1. Create and manage multiple contexts
 * 2. Conditionally render based on context values
 * 3. Act as a simple div wrapper
 */

import { addContexts, useContainerContext, ContextContainerObjectType } from './contextsGestion';

/**
 * Compares two objects to check if they share the same key-value pairs
 * Ignores the 'include' key in the comparison
 */
function containsSameKeysAndValues(obj1: ContextContainerObjectType, obj2: ContextContainerObjectType): boolean {
    const keysToCheck = Object.keys(obj1).filter(key => key !== 'include');
    return keysToCheck.every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
}

// Props type definition combining HTML div props with custom context props
type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    contexts?: Array<{ contextName: string; contextValue?: ContextContainerObjectType }>;
    contextTiedTo?: string;  // Name of context to tie rendering to
    existValue?: ContextContainerObjectType;  // Values to check for conditional rendering
};

export default function Container({ children, contexts = [], contextTiedTo, existValue = {}, ...props }: ContainerProps) {
    // Create new context providers from the contexts prop
    const newContexts = addContexts(contexts);
    // Get the context value for conditional rendering
    const tiedTo = useContainerContext(contextTiedTo || 'default');
    let display = 'block';

    // Conditional rendering logic based on context values
    if (contextTiedTo && existValue && tiedTo!.value) {
        // If include is true, render only if values match
        if (existValue.include && containsSameKeysAndValues(existValue, tiedTo!.value)) {
            display = 'none';
        }
        // If include is false, render only if values don't match
        else if (!existValue.include && !containsSameKeysAndValues(existValue, tiedTo!.value)) {
            display = 'none';
        }
    }

    // If there are contexts to provide, wrap children in context providers
    if (newContexts.length > 0) {
        return (
            <div 
                {...props} 
                className={props.className}
                style={{
                    ...props.style,
                    display: display === 'none' ? 'none' : undefined
                }}
            >
                {/* Nest context providers from right to left */}
                {newContexts.reduceRight((acc, Context, index) => (
                    <Context.provider key={index}>
                        {acc}
                    </Context.provider>
                ), children)}
            </div>
        );
    }

    // If no contexts, just render as a div
    return (
        <div 
            {...props} 
            className={props.className}
            style={{
                ...props.style,
                display: display === 'none' ? 'none' : undefined
            }}
        >
            {children}
        </div>
    );
}