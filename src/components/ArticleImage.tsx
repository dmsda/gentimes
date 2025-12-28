import Image from 'next/image';

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

export function ArticleImage({
  src,
  alt,
  caption,
  priority = false,
}: ArticleImageProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
