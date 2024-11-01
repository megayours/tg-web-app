"use client";

import { useEffect, useState } from 'react';
import './styles.css';
import Image from 'next/image';

interface LogoProps {
  width?: number | string;
  images?: string[];
  interval?: number;
}

const defaultImages = [
  '/images/logo/logo-image1.png',
  '/images/logo/logo-image2.png',
  '/images/logo/logo-image3.png',
  '/images/logo/logo-image4.png',
  '/images/logo/logo-image5.png',
];

export default function Logo({
  width = 300,
  images = defaultImages,
  interval = 1000
}: LogoProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="logo_container">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Logo ${index + 1}`}
          className="logo_image"
          width={typeof width === 'number' ? width : parseInt(width)}
          height={typeof width === 'number' ? width : parseInt(width)}
          style={{
            opacity: index === currentImage ? 1 : 0,
          }}
          priority={index === 0} // Prioritize loading of first image
        />
      ))}
    </div>
  );
}
