/**
 * Enhanced Input Component
 * 
 * A context-aware input component that provides:
 * - Debounced API requests
 * - Context integration
 * - Location-aware functionality
 * - Error handling
 */

'use client'

import React, { InputHTMLAttributes, useState } from 'react';
import { useContainerContext } from "../container/contextsGestion";

/**
 * Props interface extending HTML input attributes
 * @property context - Optional context name for state management
 * @property fetchUrl - Optional URL for API requests
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    context?: string;
    fetchUrl?: string;
}

export default function Input({context, fetchUrl, ...props}: InputProps) {
    // Get context with fallback to default
    const inputContext = useContainerContext(context || 'default');
    
    // Local state for input value and debounce timer
    const [inputValue, setInputValue] = useState("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    /**
     * Handles input changes with debounced API requests
     * - Clears previous timeout
     * - Makes API request after delay
     * - Updates context on successful response
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (timeoutId) clearTimeout(timeoutId);

        if (event.target.value.trim() !== '') {
            // Debounced API request
            const id = setTimeout(async () => {
                try {
                    const response = await fetch(fetchUrl || '', {
                        method: 'POST',
                        body: JSON.stringify({
                            inputValue: event.target.value,
                            // Use context coordinates or default to Paris
                            latitude: inputContext?.value?.latitude || 48.8566,
                            longitude: inputContext?.value?.longitude || 2.3522
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    
                    // Trigger re-render on success
                    if (response.ok) {
                        inputContext?.setValue(prev => ({...prev, reRender: Math.random() }));
                    }
                } catch (error) {
                    console.error('Error fetching input:', error);
                }
            }, 200);
        
            setTimeoutId(id);
        }
        else {
            // Reset context on empty input
            inputContext?.setValue(prev => ({...prev, reRender: 1 }));
        }
    };

    return <input {...props} value={inputValue} onChange={handleChange} />;
}