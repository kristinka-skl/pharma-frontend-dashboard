'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  name: string;
  className?: string;
}

export default function AvatarWithFallback({ src, name, className }: AvatarProps) {
  const [imgSrc, setImgSrc] = useState(src || '/images/default-avatar.png');

  return (
    <Image
      className={className}
      src={imgSrc}
      width={24}
      height={24}
      alt={name || 'portrait photo'}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      onError={() => {
        setImgSrc('/images/default-avatar.png');
      }}
      

      onLoad={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        
        // Ділимо ширину на висоту, щоб отримати співвідношення сторін.
        const aspectRatio = target.naturalWidth / target.naturalHeight;
        
        // Заглушка Imgur має розмір 161x81 (співвідношення ~1.98).
        // Якщо картинка дуже широка, це на 99.9% та сама чорна заглушка!
        if (aspectRatio > 1.9 && aspectRatio < 2.1) {
          setImgSrc('/images/default-avatar.png');
        }
      }}
    />
  );
}