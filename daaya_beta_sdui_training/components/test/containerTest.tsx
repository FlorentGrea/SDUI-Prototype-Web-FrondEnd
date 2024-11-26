import { addContexts, useContainerContext } from './contextsGestion';

// Define a specific type for the context value
type MyObjectType = {
    [key: string]: string | number; // Allow only strings or numbers as values
};

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    contexts?: Array<{ contextName: string; contextValue?: MyObjectType }>;
    contextTiedTo?: string;
};

export default function Container({ children, contexts = [], contextTiedTo, ...props }: ContainerProps) {
    const newContexts = addContexts(contexts);
    const tiedTo = useContainerContext(contextTiedTo || 'default');

    if (contextTiedTo && tiedTo!.value === null) // Check if contextTiedTo exists and tiedTo.value is null
        return;

    if (newContexts.length > 0) {
        return (
            <div {...props}>
                {newContexts.reduceRight((acc, Context, index) => (
                    <Context.provider key={index}>
                        {acc}
                    </Context.provider>
                ), children)}
            </div>
        );
    }

    return (
        <div {...props}>
            {children}
        </div>
    );
}