/**
 * Image Component
 * 
 * A wrapper around Next.js Image component that:
 * - Ensures alt tags are always present for accessibility
 * - Maintains type safety with ImageProps
 * - Allows all Next.js Image optimizations
 * - Provides consistent image handling across the application
 */

import Image, { ImageProps } from 'next/image';

/**
 * ImageComponent
 * @param props - Extends Next.js ImageProps
 * @param props.alt - Alt text for accessibility, defaults to empty string
 * @returns Optimized Next.js Image component with guaranteed alt text
 */
export default function ImageComponent({alt = '', ...props}: ImageProps) {
    return <Image alt={alt} {...props} />
}