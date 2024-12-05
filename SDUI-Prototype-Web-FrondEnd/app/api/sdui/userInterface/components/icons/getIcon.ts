import bedIcon from "./iconList/bedIcon";
import bicycleIcon from "./iconList/bicycleIcon";
import boatIcon from "./iconList/boatIcon";
import calendarIcon from "./iconList/calendarIcon";
import carIcon from "./iconList/carIcon";
import chatIcon from "./iconList/chatIcon";
import downArrowIcon from "./iconList/downArrowIcon";
import filterIcon from "./iconList/filterIcon";
import houseIcon from "./iconList/houseIcon";
import leftArrowIcon from "./iconList/leftArrowIcon";
import listIcon from "./iconList/listIcon";
import locateIcon from "./iconList/locateIcon";
import locationIcon from "./iconList/locationIcon";
import mapIcon from "./iconList/mapIcon";
import meetIcon from "./iconList/meetIcon";
import planeIcon from "./iconList/planeIcon";
import plusIcon from "./iconList/plusIcon";
import positionIcon from "./iconList/positionIcon";
import rightArrowIcon from "./iconList/rightArrowIcon";
import searchIcon from "./iconList/searchIcon";
import twoPeopleIcon from "./iconList/twoPeopleIcon";
import upArrowIcon from "./iconList/upArrowIcon";
import uploadIcon from "./iconList/uploadIcon";
import vanIcon from "./iconList/vanIcon";
import warningIcon from "./iconList/warningIcon";
import xIcon from "./iconList/xIcon";

interface IconResult {
    type: string;
    props: SvgProps;
}

interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

type IconFunction = (props?: SvgProps) => IconResult;

const iconFunctions: { [key: string]: IconFunction } = {
    bedIcon,
    bicycleIcon,
    boatIcon,
    calendarIcon,
    carIcon,
    chatIcon,
    downArrowIcon,
    filterIcon,
    houseIcon,
    leftArrowIcon,
    listIcon,
    locateIcon,
    locationIcon,
    mapIcon,
    meetIcon,
    planeIcon,
    plusIcon,
    positionIcon,
    rightArrowIcon,
    searchIcon,
    twoPeopleIcon,
    upArrowIcon,
    uploadIcon,
    vanIcon,
    warningIcon,
    xIcon,
}

export function getIcon(iconName: string, props?: SvgProps): IconResult {
    const functionName = iconName.charAt(0).toLowerCase() + iconName.slice(1);
    if (functionName in iconFunctions) {
        return iconFunctions[functionName](props);
    }
    throw new Error(`Icon "${iconName}" not found`);
}