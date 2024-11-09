"use client";

import './styles.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LogoProps {
  width?: number | string;
  images?: string[];
  interval?: number;
  animate?: boolean;
}

const defaultImages = [
  '/images/logo/logo.jpeg',
  // Add more variations if you have them
];

export default function Logo({
  width = 168,
  images = defaultImages,
  interval = 5000,
  animate = false,
}: LogoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!animate || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [animate, images, interval]);

  const dimensionValue = typeof width === 'number' ? width : parseInt(width);

  return (
    <div 
      className="logo_container"
      style={{
        width: dimensionValue,
        height: dimensionValue,
      }}
    >
      <Image
        src={images[currentImageIndex]}
        alt="Logo"
        className="logo_image"
        width={dimensionValue}
        height={dimensionValue}
        priority={true}
      />
    </div>
  );
}
