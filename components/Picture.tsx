import React from 'react';
import { IMAGES, getImageSrcSet, getImageFallbackUrl } from '../lib/images';

interface PictureProps {
  imageKey: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  customAlt?: string;
}

export const Picture: React.FC<PictureProps> = ({
  imageKey,
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
  customAlt,
}) => {
  const item = IMAGES[imageKey];
  if (!item) {
    console.warn(`Picture component received unknown imageKey: "${imageKey}"`);
    return null;
  }

  const avifSrcset = getImageSrcSet(imageKey, 'avif');
  const webpSrcset = getImageSrcSet(imageKey, 'webp');
  const jpgSrcset = getImageSrcSet(imageKey, 'jpg');
  const fallbackSrc = getImageFallbackUrl(imageKey);
  const altText = customAlt || item.alt;

  return (
    <picture className={`ms-pic block relative w-full h-full overflow-hidden ${className}`}>
      <source type="image/avif" srcSet={avifSrcset} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcset} sizes={sizes} />
      <img
        src={fallbackSrc}
        srcSet={jpgSrcset}
        sizes={sizes}
        alt={altText}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        data-image-status={item.status}
        className={`w-full h-full object-cover object-center transition-opacity duration-300 ${imgClassName}`}
      />
    </picture>
  );
};
