import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

/**
 * OptimizedImage Component
 * 
 * Wrapper around Next.js Image component that:
 * - Automatically converts images to WebP/AVIF
 * - Uses responsive breakpoints
 * - Handles Strapi media URLs
 * - Provides fallback for missing images
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
}: OptimizedImageProps) {
  // Handle Strapi media URLs
  const imageUrl = src.startsWith('/') && !src.startsWith('//')
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${src}`
    : src;

  // Placeholder for missing images
  const placeholderUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=${width || 800}&h=${height || 600}&fit=crop&auto=format`;
  const finalSrc = src ? imageUrl : placeholderUrl;

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        priority={priority}
        className={className}
        sizes={sizes}
        quality={quality}
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      className={className}
      sizes={sizes}
      quality={quality}
    />
  );
}

interface ResponsiveImageProps extends OptimizedImageProps {
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2';
}

/**
 * ResponsiveImage Component
 * 
 * Image component with predefined aspect ratios
 */
export function ResponsiveImage({
  aspectRatio = '16:9',
  className = '',
  ...props
}: ResponsiveImageProps) {
  const aspectClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:2': 'aspect-[3/2]',
  };

  return (
    <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]} ${className}`}>
      <OptimizedImage {...props} fill />
    </div>
  );
}

/**
 * Get optimized Strapi image URL with format
 * 
 * Strapi automatically generates different sizes:
 * - thumbnail (245x156)
 * - small (500x500)
 * - medium (750x750)
 * - large (1000x1000)
 */
export function getStrapiImageUrl(
  image: {
    url?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  } | null,
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string {
  if (!image) return '';

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // Get the appropriate format
  if (size !== 'original' && image.formats?.[size]?.url) {
    return `${strapiUrl}${image.formats[size].url}`;
  }

  // Fallback to original
  return image.url ? `${strapiUrl}${image.url}` : '';
}
