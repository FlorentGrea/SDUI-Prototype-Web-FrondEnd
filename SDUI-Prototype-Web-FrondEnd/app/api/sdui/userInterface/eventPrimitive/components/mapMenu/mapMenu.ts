import locationSearchBar from "./locationSearchBar/locationSearchBar";
import filtersList from "./filtersList/filtersList";

export default async function mapMenu() {

    return {
        type: 'Container',
        props: {
            className: 'z-10 absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]',
        },
        children: [{
                type: 'Container',
                props: {
                    contextTiedTo: 'eventFilters',
                    existValue: {
                        include: 0,
                        filterClicked: 0,
                }},
                children: [
                    locationSearchBar(),
                    {
                        type: 'SduiCall',
                        props: {
                            macroComponentName: 'AdressAutoComplete', 
                            context: 'ViewState'
            }}]},
            await filtersList()
]}}