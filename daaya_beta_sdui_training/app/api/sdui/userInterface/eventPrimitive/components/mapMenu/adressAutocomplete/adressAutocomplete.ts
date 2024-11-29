import type { MapboxSuggestion } from '@/app/api/adressAutoComplete/route';

async function fetchSuggestions(): Promise<MapboxSuggestion[]> {
    try {
        const response = await fetch(`http://localhost:3000/api/adressAutoComplete`);
        if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
}

export default async function adressAutoComplete() {
    const suggestions: MapboxSuggestion[] = await fetchSuggestions();

    const autocomplete = suggestions.map((suggestion, index) => {
        return (
            {
                type: 'Button',
                props: {
                    key: suggestion.mapbox_id || index,
                    clickBehaviour: 'mapbox_suggestion_click',
                    clickContext: 'ViewState',
                    newContextValue: {
                        mapbox_id: suggestion.mapbox_id,
                    },
                    className: "flex items-center gap-1 p-1 mt-1 w-full hover:bg-[#eeeeee] cursor-pointer",
                },
                children: [
                    {type: 'LocationIcon', props: {className: 'w-5 h-5 flex-shrink-0'}},
                    {
                        type: 'Container', 
                        props: {className: 'flex flex-col w-full min-w-0'},
                        children: [
                            {type: 'Text', props: {text: suggestion.name, className: 'w-full font-bold text-base truncate text-left'}},
                            {type: 'Text', props: {text: suggestion.full_address, className: 'w-full text-sm text-gray-600 truncate text-left'}},
                        ]
                    },
                ]
            }
        )
    })
        
    return {
            type: 'Container',
            props: {
                contextTiedTo: 'ViewState',
                existValue: {
                    include: 1,
                    reRender: 1,
                },
                className: 'w-full h-full',
            },
            children: autocomplete
    }
}/*                    
{searchSuggestions.map((suggestion, index) => (
    <Container 
        key={suggestion.mapbox_id || index} 
        className="flex items-center gap-1 p-1 mt-1 w-full hover:bg-[#eeeeee] cursor-pointer"
        onClick={() => handleSuggestionClick(suggestion)}
    >
        <IconComponents.LocationIcon className="w-5 h-5 flex-shrink-0" />
        <Container className="flex flex-col w-full min-w-0">
            <span className="w-full font-bold text-base truncate">{suggestion.name}</span>
            <span className="w-full text-sm text-gray-600 truncate">{suggestion.full_address}</span>
        </Container>
    </Container>
))}
    return (
        <Container 
            ref={menuRef}
            className="absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]"
        >
            <>
                <Container className="w-full h-fit flex flex-row items-center">
                    <Container className="w-full h-10 p-1 flex flex-row rounded-full items-center bg-[#eeeeee]">
                        <IconComponents.SearchIcon className="w-[28px] h-[28px] fill-[#888888]" />
                        <input
                            type="search"
                            placeholder="Localisation"
                            className="w-full h-full text-xl bg-transparent outline-none"
                            onChange={debouncedSearch}
                            onFocus={handleFocus}
                        />
                    </Container>
                    <Button onClick={() => setFilterPage(!filterPage)}>
                        <IconComponents.FilterIcon className="w-[40px] h-[40px]" />
                    </Button>
                </Container>
                <Container className="w-full h-fit overflow-hidden rounded-b-[24px]">
                    {searchSuggestions.map((suggestion, index) => (
                        <Container 
                            key={suggestion.mapbox_id || index} 
                            className="flex items-center gap-1 p-1 mt-1 w-full hover:bg-[#eeeeee] cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <IconComponents.LocationIcon className="w-5 h-5 flex-shrink-0" />
                            <Container className="flex flex-col w-full min-w-0">
                                <span className="w-full font-bold text-base truncate">{suggestion.name}</span>
                                <span className="w-full text-sm text-gray-600 truncate">{suggestion.full_address}</span>
                            </Container>
                        </Container>
                    ))}
                </Container>
            </>
        </Container>
    );
}*/