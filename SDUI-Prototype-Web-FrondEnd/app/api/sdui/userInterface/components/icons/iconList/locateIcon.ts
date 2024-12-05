interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

export default function locateIcon(additionalProps: SvgProps = {}) {
    return {
        type: "Svg",
        props: {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M2 12h3 M19 12h3 M12 2v3 M12 19v3 M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14",
            ...additionalProps
}}}