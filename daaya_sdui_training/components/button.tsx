type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button {...props} className={`rounded-full bg-white ${props.className || ''}`}>
            {children}
        </button>
    )
}