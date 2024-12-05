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
                }},{
                    contextName: 'SelectedId', 
                    contextValue: {id: 0}
                },{
                    contextName: 'eventFilters', 
                    contextValue: {
                        activityType: 0,
                        BedIcon: 0,
                        BicycleIcon: 0,
                        BoatIcon: 0,
                        CarIcon: 0,
                        MeetIcon: 0,
                        PlaneIcon: 0,
                        VanIcon: 0,
                        filterClicked: 0,
                        reRender: 1,
                    }
            },{
                contextName: 'eventsCard',
                contextValue: {
                    mainButton: 1,
                    selectedId: '',
                }
            }],
            className: 'w-full h-screen',
        },
        children: [{
                type: 'Map',
                children: [{
                        type: 'Container', 
                        props: {className: 'w-full h-full'},
                        children: [{
                                type: 'SduiCall', 
                                props: { macroComponentName: 'MapMarkers', context: 'eventFilters' }
                            },{
                                type: 'SduiCall',
                                props: { macroComponentName: 'MapMenu' }
                            },{
                                type: 'SduiCall',
                                props: { macroComponentName: 'EventsCard' }
}]}]}]}}