import { getIcon } from '@/app/api/sdui/userInterface/components/icons/getIcon';

export default function locationSearchBar() {
    return {
        type: 'Container',
        props: {
            className: 'w-full h-fit flex flex-row items-center',
        },
        children: [
            {
                type: 'Container',
                props: {
                    className: 'w-full h-10 p-1 flex flex-row rounded-full items-center bg-[#eeeeee]',
                },
                children: [
                    getIcon('searchIcon', {className: 'w-[28px] h-[28px] fill-[#888888]'}),
                    {
                        type: 'Input',
                        props: {
                            context: 'ViewState',
                            placeholder: 'Localisation',
                            fetchUrl: '/api/adressAutoComplete',
                            className: 'w-full h-full text-xl bg-transparent outline-none',
                            type: 'search',
                        },
                    },
                ]
            },
            {
                type: 'Button', 
                props: {
                    clickBehaviour: 'change_context',
                    clickContext: 'eventFilters',
                    newContextValue: {filterClicked: 1},
                },
                children: [getIcon('filterIcon', {className: 'w-[40px] h-[40px]'})]
            },
        ]
    }
}