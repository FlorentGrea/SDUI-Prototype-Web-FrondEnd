'use client'

import { useContainerContext, ContextContainerObjectType, ContextContainerType } from "./Container/contextsGestion";

function defineClickBehaviour(clickBehaviour: string, onClickContext: ContextContainerType | null, newContextValue: ContextContainerObjectType) {
    if (clickBehaviour === 'change_context') {
        return () => onClickContext?.setValue((prev: ContextContainerObjectType | null) => ({...prev, ...newContextValue}));
    }
    return () => {};
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    dataId?: number;
    clickBehaviour?: string;
    clickContext?: string;
    newContextValue?: ContextContainerObjectType;
};

export default function Button({children, clickBehaviour, clickContext, newContextValue, ...props}: ButtonProps) {
    const onClickContext = useContainerContext(clickContext || 'default');

    let onClickBehaviour = () => {};
    if (clickBehaviour && clickContext && newContextValue) 
        onClickBehaviour = defineClickBehaviour(clickBehaviour, onClickContext, newContextValue);

    return (
        <button {...props} onClick={onClickBehaviour}>
            {children}
        </button>
    )
}