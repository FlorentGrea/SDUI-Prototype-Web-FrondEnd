export default function mainPage() {
    const render = {
        type: 'Container',
        props: {
            contexts: [
                {contextName: 'Primitives', contextValue: {
                    settingsPrimitive: 0,
                    eventPrimitive: 1,
                    messagesPrimitive: 0,
                }},
            ],
            className: 'w-full h-screen',
        },
        children: [
            {type: 'SduiCall', props: { macroComponentName: 'EventPrimitive' }},
            {type: 'SduiCall', props: { macroComponentName: 'MainMenu' }},
        ],
    }

    return render
}