import Image, { ImageProps } from 'next/image';

export default function ImageComponent({alt = '', ...props}: ImageProps) {
    return <Image alt={alt} {...props} />
}