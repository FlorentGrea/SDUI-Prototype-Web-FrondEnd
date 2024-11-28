import { InputHTMLAttributes, useState } from "react";
import { useContainerContext } from "./Container/contextsGestion"; // Adjust the import path as necessary

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    context?: string;
    fetchUrl?: string;
}

export default function Input({context, fetchUrl, ...props}: InputProps) {
    const updateVariable =  useContainerContext(context || 'default');
    const [inputValue, setInputValue] = useState("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        // Clear previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Set a new timeout
        const id = setTimeout(() => {
            // Call the API after the delay
            const sendData = {...updateVariable?.value, inputValue: event.target.value};
            fetch(fetchUrl || '', {
                method: 'POST',
                body: JSON.stringify(sendData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    updateVariable?.setValue({...updateVariable?.value, reRender: (Number(updateVariable?.value?.reRender || 0) + 1) % 2}); // Update the context variable if the response is okay
                }
            });
        }, 300); // Adjust the delay time as necessary
        setTimeoutId(id);
    };

    return (
        <input {...props} value={inputValue} onChange={handleChange} />
    )
}