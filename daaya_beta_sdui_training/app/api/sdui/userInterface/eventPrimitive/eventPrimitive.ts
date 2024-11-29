export default function eventPrimitive() {

    return {
        type: 'Container',
        props: {
            contexts: [
                {contextName: 'ViewState', contextValue: {
                    latitude: 46.2276,
                    longitude: 2.2137,
                    zoom: 4,
                    reRender: 1,
                }},
                {contextName: 'SelectedId', contextValue: {id: 0}},
            ],
            className: 'w-full h-screen',
        },
        children: [
            {
                type: 'Map',
                children: [
                    {
                        type: 'Container', 
                        props: {
                            contexts: [{contextName: 'loadMarkers', contextValue: {load: 1}}],
                            className: 'w-full h-full',
                        },
                        children: [
                            {
                                type: 'SduiCall', 
                                props: { macroComponentName: 'MapMarkers' }
                            },
                            {
                                type: 'SduiCall', 
                                props: { macroComponentName: 'MapMenu' }
                            }
                        ]
                    }
                ],
            },
        ],
    }
}