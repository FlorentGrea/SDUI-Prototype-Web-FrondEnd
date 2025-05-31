import { SVGProps } from 'react';

interface SvgProps extends SVGProps<SVGSVGElement> {
    d?: string;
}

export default function Svg({ d, ...props }: SvgProps) {
    return (
        <svg {...props}>
            <path d={d} />
        </svg>
    )
}