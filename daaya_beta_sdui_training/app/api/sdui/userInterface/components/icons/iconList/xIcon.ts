interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

export default function xIcon(additionalProps: SvgProps = {}) {
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
            d: "M18 6 L6 18 M6 6 L18 18",
            ...additionalProps
        },
    }
} 