import eventsTypeFilter from "./eventsTypeFilter/eventsTypeFilter";

export default async function filtersList() {

    return {
        type: 'Container',
        props: {
            contextTiedTo: 'eventFilters',
            existValue: {
                include: 0,
                filterClicked: 1,
            },
        },
        children: [
            {
                type: 'Container',
                props: {
                    className: 'w-full h-fit flex flex-row items-center justify-center',
                },
                children: [
                    {
                        type: 'Text',
                        props: {
                            text: 'Filtres',
                            className: 'text-xl font-bold h-10 flex items-center',
                        },
                    }
                ]
            },
            {
                type: 'Container',
                props: {
                    className: 'w-full h-[600px] rounded-xl shadow-[inset_0px_-4px_10px_0px_#00000020] overflow-y-scroll scrollbar-hide',
                },  
                children: [
                    await eventsTypeFilter(),
                ]
            },
            {
                type: 'Container',
                props: {
                    className: 'w-full h-fit p-1 pt-2 flex flex-row justify-evenly',
                },
                children: [
                    {
                        type: 'Button',
                        props: {
                            clickBehaviour: 'change_context',
                            clickContext: 'eventFilters',
                            newContextValue: {filterClicked: 0},
                            className: 'w-[100px] h-10 text-xl font-bold',
                        },
                        children: [
                            {
                                type: 'Text',
                                props: {text: 'Effacer'}
                            }
                        ]
                    },
                    {
                        type: 'Button',
                        props: {
                            className: 'w-[100px] h-10 bg-[#000000] text-white text-xl font-bold rounded-full',
                        },
                        children: [
                            {
                                type: 'Text',
                                props: {text: 'Filtrer'}
}]}]}]}}