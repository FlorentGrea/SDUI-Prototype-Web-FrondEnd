// componentRegistry.tsx
// This file serves as a central registry for all micro-components used in the application.
// It imports various components and organizes them into a single object for easy access and management.
// This approach promotes modularity and reusability of components throughout the application.

import ContainerTest from '../container/container';
import SduiCall from './sduiCall';
import Map from '../mapTools/map';
import MapPopup from '../mapTools/mapPopup';
import MapMarker from '../mapTools/mapMarker';
import Button from '../button/button';
import ImageComponent from '../image/image';
import Text from '../text/text';
import Input from '../input/input';
import Svg from '../svg/svg';

// Exporting an object that contains all the micro-components.
// This allows for easy access to components by their names throughout the application.
export const MicroComponents = {
    Map: Map,
    MapPopup: MapPopup,
    MapMarker: MapMarker,
    Container: ContainerTest,
    SduiCall: SduiCall,
    Button: Button,
    Image: ImageComponent,
    Text: Text,
    Input: Input,
    Svg: Svg
};

// The MicroComponents object can now be imported and used in other parts of the application,
// allowing for a consistent and organized way to access all micro-components.