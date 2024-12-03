interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

export default function bedIcon(additionalProps: SvgProps = {}) {
    return {
        type: "Svg",
        props: {
            fill: "#000000",
            width: "800px",
            height: "800px",
            viewBox: "0 0 256 256",
            id: "Flat",
            d: "M208,68H28V48A12,12,0,0,0,4,48V208a12,12,0,0,0,24,0V180H228v28a12,12,0,0,0,24,0V112A44.04978,44.04978,0,0,0,208,68ZM28,92H92v64H28Zm88,64V92h92a20.02292,20.02292,0,0,1,20,20v44Z",
            ...additionalProps, // Spread additional props
        },
    }
} 