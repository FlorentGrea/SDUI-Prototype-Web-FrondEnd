import { addContexts, useContainerContext, ContextContainerObjectType } from './contextsGestion';


function containsSameKeysAndValues(obj1: ContextContainerObjectType, obj2: ContextContainerObjectType): boolean {
    const keysToCheck = Object.keys(obj1).filter(key => key !== 'include');

    // Check if all keys in obj1 (excluding 'include') exist in obj2 with the same values
    return keysToCheck.every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
}

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    contexts?: Array<{ contextName: string; contextValue?: ContextContainerObjectType }>;
    contextTiedTo?: string;
    existValue?: ContextContainerObjectType;
};

export default function Container({ children, contexts = [], contextTiedTo, existValue = {}, ...props }: ContainerProps) {
    const newContexts = addContexts(contexts);
    const tiedTo = useContainerContext(contextTiedTo || 'default');

    console.log('contextTiedTo', contextTiedTo);
    console.log('existValue', existValue);
    console.log('tiedTo', tiedTo);
    if (contextTiedTo && existValue && tiedTo!.value) {
        if (existValue.include && containsSameKeysAndValues(existValue, tiedTo!.value)) {
            return; // This will exit the function if the condition is true
        }
        else if (!existValue.include && !containsSameKeysAndValues(existValue, tiedTo!.value)) {
            return;
        }
    }

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