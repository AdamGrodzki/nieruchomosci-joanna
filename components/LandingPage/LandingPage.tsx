import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image, { StaticImageData } from 'next/image';
import styles from './landingPage.module.scss';

import logo from "../../images/logoDark.png"; 
import carouselImage1 from "../../images/kitchen.jpg";
import carouselImage2 from "../../images/living-room2.jpg";
import carouselImage3 from "../../images/living-room3.jpg";

const images: StaticImageData[]= [ carouselImage1, carouselImage2, carouselImage3];

const LandingPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
  
    const intervalId = setInterval(() => {
      emblaApi?.canScrollNext() ? emblaApi.scrollNext() : emblaApi.scrollTo(0);
    }, 6000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(intervalId);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index:number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className={styles.parentContainer}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {images.map((src, index) => (
            <div className={styles.emblaSlide} key={index}>
              <Image
                src={src}
                alt={`Carousel Image ${index + 1}`}
                layout="fill"
                className={styles.emblaImage}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.heroContent}>
        <Image
          src={logo}
          height={400}
          width={400}
          alt="Logo Joanna Nieruchomości"
          priority
        />
      </div>
      <div className={styles.pagination}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${selectedIndex === index ? styles.active : ''}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;