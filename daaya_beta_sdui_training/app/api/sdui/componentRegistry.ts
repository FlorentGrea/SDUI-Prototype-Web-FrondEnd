import mainMenu from "./userInterface/components/mainMenu/mainMenu";
import eventPrimitive from "./userInterface/eventPrimitive/eventPrimitive";
import mapMarkers from "./userInterface/eventPrimitive/components/mapMarkers/mapMarkers";
import mainPage from "./userInterface/mainPage";
import mapMenu from "./userInterface/eventPrimitive/components/mapMenu/mapMenu";
import adressAutoComplete from "./userInterface/eventPrimitive/components/mapMenu/locationSearchBar/adressAutoComplete/adressAutoComplete";
import locationSearchBar from "./userInterface/eventPrimitive/components/mapMenu/locationSearchBar/locationSearchBar";
import filtersList from "./userInterface/eventPrimitive/components/mapMenu/filtersList/filtersList";

export const componentRegistry = {
    MainPage: mainPage,
    MainMenu: mainMenu,
    EventPrimitive: eventPrimitive,
    MapMarkers: mapMarkers,
    MapMenu: mapMenu,
    AdressAutoComplete: adressAutoComplete,
    LocationSearchBar: locationSearchBar,
    FiltersList: filtersList,
}