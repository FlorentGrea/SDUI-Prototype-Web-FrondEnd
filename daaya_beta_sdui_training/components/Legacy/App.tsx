import React from 'react';
import { useContainerContext } from './contextsGestion';
import Container from './containerTest';

function ChildComponent() {
    const context1 = useContainerContext('context1');
    const context2 = useContainerContext('context2');
    const context3 = useContainerContext('context3');

    return (
        <div>
            <h1>Context Values</h1>
            <p>Context 1 Value: {context1?.value}</p>
            <p>Context 2 Value: {context2?.value}</p>
            <p>Context 3 Value: {context3?.value}</p>
            {/* Example buttons to update context values */}
            <button onClick={() => context1?.setValue((prev) => prev + 1)}>Increment Context 1</button>
            <button onClick={() => context2?.setValue((prev) => prev + 1)}>Increment Context 2</button>
            <button onClick={() => context3?.setValue((prev) => prev + 1)}>Increment Context 3</button>
        </div>
    );
};

export default function App() {
    const contexts = [
        { contextName: 'context1', contextValue: 0 },
        { contextName: 'context2', contextValue: 0 },
        { contextName: 'context3', contextValue: 0 }
    ];

    return (
        <Container contexts={contexts}>
            <ChildComponent />
        </Container>
    );
}