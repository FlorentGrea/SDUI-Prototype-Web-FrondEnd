interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    text?: string;
}

export default function Text({text = '', ...props}: TextProps) {
    return <p {...props}>{text}</p>
}