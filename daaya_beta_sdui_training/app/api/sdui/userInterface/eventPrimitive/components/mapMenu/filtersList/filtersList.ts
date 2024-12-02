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
                            }
                        ]
                    }
                ]
            }
        ]
    }
}/*
    return (
        <Container 
            ref={menuRef}
            className="absolute left-0 top-0 right-0 m-auto mt-2 w-[400px] h-fit p-1 flex flex-col rounded-[24px] pointer-events-auto bg-white shadow-[0px_0px_4px_1px_#00000060]"
        >
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
        </Container>
    );
}*/
