interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

export default function carIcon(additionalProps: SvgProps = {}) {
    return {
        type: "Svg",
        props: {
            fill: "#000000",
            width: "800px",
            height: "800px",
            viewBox: "0 0 256 256",
            id: "Flat",
            d: "M240,108h-8.20142L205.07617,47.876A20.0185,20.0185,0,0,0,186.80078,36H69.19922A20.02024,20.02024,0,0,0,50.92285,47.877L24.20129,108H16a12,12,0,0,0,0,24h4v76a20.02229,20.02229,0,0,0,20,20H64a20.02229,20.02229,0,0,0,20-20V188h88v20a20.02229,20.02229,0,0,0,20,20h24a20.02229,20.02229,0,0,0,20-20V132h4a12,12,0,0,0,0-24ZM71.79883,60H184.20117l21.3335,48H50.46533ZM60,204H44V188H60Zm136,0V188h16v16Zm16-40H44V132H212Z",
            ...additionalProps
}}}