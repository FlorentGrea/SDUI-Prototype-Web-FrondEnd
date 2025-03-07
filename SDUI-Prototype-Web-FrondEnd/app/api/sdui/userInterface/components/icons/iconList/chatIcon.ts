interface SvgProps {
    [key: string]: string; // This allows for any additional props
}

export default function chatIcon(additionalProps: SvgProps = {}) {
    return {
        type: "Svg",
        props: {
            fill: "#000000",
            width: "800px",
            height: "800px",
            viewBox: "0 0 256 256",
            id: "Flat",
            d: "M132,19.99219a104.1179,104.1179,0,0,0-104,104v84.33349a19.68877,19.68877,0,0,0,19.667,19.66651H132a104,104,0,0,0,0-208Zm0,184H52v-80a80,80,0,1,1,80,80ZM99.999,127.99707a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,99.999,127.99707Zm48,0a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,147.999,127.99707Zm48,0a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,195.999,127.99707Z",
            ...additionalProps
}}}