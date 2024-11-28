import mainMenu from "./userInterface/components/mainMenu/mainMenu";
import eventPrimitive from "./userInterface/eventPrimitive/eventPrimitive";
import mapMarkers from "./userInterface/eventPrimitive/components/mapMarkers/mapMarkers";
import mainPage from "./userInterface/mainPage";
import mapMenu from "./userInterface/eventPrimitive/components/mapMenu/mapMenu";
import adressAutocomplete from "./userInterface/eventPrimitive/components/mapMenu/adressAutocomplete/adressAutocomplete";

export const componentRegistry = {
    MainPage: mainPage,
    MainMenu: mainMenu,
    EventPrimitive: eventPrimitive,
    MapMarkers: mapMarkers,
    MapMenu: mapMenu,
    AdressAutocomplete: adressAutocomplete,
}