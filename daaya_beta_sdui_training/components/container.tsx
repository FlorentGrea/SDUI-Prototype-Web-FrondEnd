import { forwardRef } from 'react';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export default forwardRef<HTMLDivElement, ContainerProps>(function Container({ children, ...props }, ref) {
    return (
        <div ref={ref} {...props} className={`${props.className || ''}`}>
            {children}
        </div>
    );
});