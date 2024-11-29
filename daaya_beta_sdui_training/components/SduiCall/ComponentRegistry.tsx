// componentRegistry.tsx
// This file serves as a central registry for all micro-components used in the application.
// It imports various components and organizes them into a single object for easy access and management.
// This approach promotes modularity and reusability of components throughout the application.

import ContainerTest from '../container/container'; // Importing a container component for layout
import SduiCall from './sduiCall'; // Importing the SduiCall component
import * as Icons from '../icons/icons'; // Importing all icon components for use in the application
import Map from '../mapTools/map'; // Importing the Map component
import MapPopup from '../mapTools/mapPopup'; // Importing the MapPopup component
import MapMarker from '../mapTools/mapMarker'; // Importing the MapMarker component
import Button from '../button/button'; // Importing the Button component
import ImageComponent from '../image/image'; // Importing the Image component
import Text from '../text/text'; // Importing the Text component
import Input from '../input/input'; // Importing the Input component

// Exporting an object that contains all the micro-components.
// This allows for easy access to components by their names throughout the application.
export const MicroComponents = {
    Map: Map, // Registering the Map component
    MapPopup: MapPopup, // Registering the MapPopup component
    MapMarker: MapMarker, // Registering the MapMarker component
    Container: ContainerTest, // Registering the Container component
    SduiCall: SduiCall, // Registering the SduiCall component
    Button: Button, // Registering the Button component
    Image: ImageComponent, // Registering the Image component
    Text: Text, // Registering the Text component
    Input: Input, // Registering the Input component

    // Registering icon components for use in the application
    ListIcon: Icons.ListIcon,
    ChatIcon: Icons.ChatIcon,
    MapIcon: Icons.MapIcon,
    LocateIcon: Icons.LocateIcon,
    XIcon: Icons.XIcon,
    HouseIcon: Icons.HouseIcon,
    MeetIcon: Icons.MeetIcon,
    VanIcon: Icons.VanIcon,
    PlaneIcon: Icons.PlaneIcon,
    PlusIcon: Icons.PlusIcon,
    BoatIcon: Icons.BoatIcon,
    BicycleIcon: Icons.BicycleIcon,
    CarIcon: Icons.CarIcon,
    UploadIcon: Icons.UploadIcon,
    WarningIcon: Icons.WarningIcon,
    BedIcon: Icons.BedIcon,
    LocationIcon: Icons.LocationIcon,
    CalendarIcon: Icons.CalendarIcon,
    TwoPeopleIcon: Icons.TwoPeopleIcon,
    SearchIcon: Icons.SearchIcon,
    FilterIcon: Icons.FilterIcon,
    UpArrowIcon: Icons.UpArrowIcon,
    RightArrowIcon: Icons.RightArrowIcon,
    DownArrowIcon: Icons.DownArrowIcon,
    LeftArrowIcon: Icons.LeftArrowIcon,
    PositionIcon: Icons.PositionIcon,
};

// The MicroComponents object can now be imported and used in other parts of the application,
// allowing for a consistent and organized way to access all micro-components.