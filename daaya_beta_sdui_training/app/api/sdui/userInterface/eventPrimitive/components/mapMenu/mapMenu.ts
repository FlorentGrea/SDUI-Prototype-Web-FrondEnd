export default function mapMenu() {

    return {
        type: 'Container',
        props: {
            className: 'absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]',
        },
        children: [
            {
                type: 'Container',
                props: {
                    className: 'w-full h-10 p-1 flex flex-row rounded-full items-center bg-[#eeeeee]',
                },
                children: [
                    {
                        type: 'SearchIcon',
                        props: {
                            className: 'w-[28px] h-[28px] fill-[#888888]',
                        },
                    },
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
                type: 'Container',
                props: {
                    className: 'w-full h-fit overflow-hidden rounded-b-[24px]',
                },
                children: [
                    {
                        type: 'SduiCall',
                        props: { 
                            macroComponentName: 'AdressAutoComplete', 
                            context: 'ViewState' 
                        }
                    }
                ]
            }
        ],
    }
}/*
    return (
        <Container 
            ref={menuRef}
            className="absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]"
        >
            {!filterPage ? (
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
            ) : (
                <>
                    <Container className="w-full h-fit flex flex-row items-center justify-center">
                        <h1 className="text-xl font-bold h-10 flex items-center">Filtres</h1>
                    </Container>
                    <Container className="w-full h-[600px] rounded-xl shadow-[inset_0px_-4px_10px_0px_#00000020] overflow-y-scroll scrollbar-hide">
                        <Container className="w-full h-fit p-2 gap-2 flex flex-col justify-center">
                            <hr className="w-full h-[1px]" />
                            <Button onClick={() => setActivityFilter(!activityFilter)} className="w-full h-fit flex flex-row justify-between">
                                <h2 className="text-lg font-bold h-[20px] flex items-center">Types d&apos;activités</h2>
                                {activityFilter ? <IconComponents.UpArrowIcon className="w-[20px] h-[20px]" /> : <IconComponents.DownArrowIcon className="w-[20px] h-[20px]" />}
                            </Button>
                            {activityFilter &&  
                                <Container className="w-full h-fit grid grid-cols-2 gap-2 place-items-center">
                                    <Button 
                                        className={`w-[160px] h-[100px] flex flex-col items-center justify-center rounded-xl ${
                                            selectedActivities.has('meeting') 
                                                ? 'bg-white text-black [&>svg]:fill-black' 
                                                : 'bg-black text-white [&>svg]:fill-white'
                                        } shadow-[0px_0px_4px_1px_#00000060]`}
                                        onClick={() => {
                                            setSelectedActivities(prev => {
                                                const newSet = new Set(prev);
                                                if (newSet.has('meeting')) {
                                                    newSet.delete('meeting');
                                                } else {
                                                    newSet.add('meeting');
                                                }
                                                return newSet;
                                            });
                                        }}
                                    >
                                        <IconComponents.MeetIcon className="w-[28px] h-[28px]" />
                                        <span className="text-lg font-bold">Rencontres</span>
                                    </Button>
                                    <Button 
                                        className={`w-[160px] h-[100px] flex flex-col items-center justify-center rounded-xl ${
                                            selectedActivities.has('VanTrip') 
                                                ? 'bg-white text-black [&>svg]:fill-black' 
                                                : 'bg-black text-white [&>svg]:fill-white'
                                        } shadow-[0px_0px_4px_1px_#00000060]`}
                                        onClick={() => {
                                            setSelectedActivities(prev => {
                                                const newSet = new Set(prev);
                                                if (newSet.has('VanTrip')) {
                                                    newSet.delete('VanTrip');
                                                } else {
                                                    newSet.add('VanTrip');
                                                }
                                                return newSet;
                                            });
                                        }}
                                    >
                                        <IconComponents.VanIcon className="w-[28px] h-[28px]" />
                                        <span className="text-lg font-bold">Voyages en van</span>
                                    </Button>
                                    <Button 
                                        className={`w-[160px] h-[100px] flex flex-col items-center justify-center rounded-xl ${
                                            selectedActivities.has('bycicleTrip') 
                                                ? 'bg-white text-black [&>svg]:fill-black' 
                                                : 'bg-black text-white [&>svg]:fill-white'
                                        } shadow-[0px_0px_4px_1px_#00000060]`}
                                        onClick={() => {
                                            setSelectedActivities(prev => {
                                                const newSet = new Set(prev);
                                                if (newSet.has('bycicleTrip')) {
                                                    newSet.delete('bycicleTrip');
                                                } else {
                                                    newSet.add('bycicleTrip');
                                                }
                                                return newSet;
                                            });
                                        }}
                                    >
                                        <IconComponents.BicycleIcon className="w-[28px] h-[28px]" />
                                        <span className="text-lg font-bold">Voyages en vélo</span>
                                    </Button>
                                    <Button 
                                        className={`w-[160px] h-[100px] flex flex-col items-center justify-center rounded-xl ${
                                            selectedActivities.has('boatTrip') 
                                                ? 'bg-white text-black [&>svg]:fill-black' 
                                                : 'bg-black text-white [&>svg]:fill-white'
                                        } shadow-[0px_0px_4px_1px_#00000060]`}
                                        onClick={() => {
                                            setSelectedActivities(prev => {
                                                const newSet = new Set(prev);
                                                if (newSet.has('boatTrip')) {
                                                    newSet.delete('boatTrip');
                                                } else {
                                                    newSet.add('boatTrip');
                                                }
                                                return newSet;
                                            });
                                        }}
                                    >
                                        <IconComponents.BoatIcon className="w-[28px] h-[28px]" />
                                        <span className="text-lg font-bold">Voyages en bateau</span>
                                    </Button>
                                </Container>
                            }
                        </Container>
                        <Container className="w-full h-fit p-2 gap-2 flex flex-col justify-center">
                            <hr className="w-full h-[1px]" />
                            <Button onClick={() => setPriceFilter(!priceFilter)} className="w-full h-fit flex flex-row justify-between">
                                <h2 className="text-lg font-bold h-[20px] flex items-center">Prix</h2>
                                {priceFilter ? <IconComponents.UpArrowIcon className="w-[20px] h-[20px]" /> : <IconComponents.DownArrowIcon className="w-[20px] h-[20px]" />}
                            </Button>
                            {priceFilter && (
                                <PriceFilter />
                            )}
                        </Container>
                        <Container className="w-full h-fit p-2 gap-2 flex flex-col justify-center">
                            <hr className="w-full h-[1px]" />
                            <Button onClick={() => setLanguageFilter(!languageFilter)} className="w-full h-fit flex flex-row justify-between">
                                <h2 className="text-lg font-bold h-[20px] flex items-center">Langue</h2>
                                {languageFilter ? <IconComponents.UpArrowIcon className="w-[20px] h-[20px]" /> : <IconComponents.DownArrowIcon className="w-[20px] h-[20px]" />}
                            </Button>
                            {languageFilter && (
                                <LanguageFilter />
                            )}
                        </Container>
                    </Container>
                    <Container  className="w-full h-fit p-1 pt-2 flex flex-row justify-evenly">
                        <Button onClick={() => setFilterPage(!filterPage)} className="w-[100px] h-10 text-xl font-bold">
                            <span>Effacer</span>
                        </Button>
                        <Button onClick={() => setFilterPage(!filterPage)} className="w-[100px] h-10 bg-[#000000] text-white text-xl font-bold rounded-full">
                            <span>Filtrer</span>
                        </Button>
                    </Container>
                </>
            )}
        </Container>
    );
}*/
