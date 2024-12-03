interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

export default function calendarIcon(additionalProps: SvgProps = {}) {
    return {
        type: "Svg",
        props: {
            fill: "#000000",
            width: "800px",
            height: "800px",
            viewBox: "0 0 256 256",
            id: "Flat",
            d: "M208,28H188V20a12,12,0,0,0-24,0v8H92V20a12,12,0,0,0-24,0v8H48A20.02229,20.02229,0,0,0,28,48V208a20.02229,20.02229,0,0,0,20,20H208a20.02229,20.02229,0,0,0,20-20V48A20.02229,20.02229,0,0,0,208,28Zm-4,24V76H52V52ZM52,204V100H204V204Z",
            ...additionalProps
        },
    }
} 