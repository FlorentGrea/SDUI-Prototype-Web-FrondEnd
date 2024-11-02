type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export default function Container({ children, ...props }: ContainerProps) {
    return (
        <div {...props} className={`${props.className || ''}`}>
            {children}
        </div>
    )
}