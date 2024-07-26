import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "@/components/Carousel/slick.module.scss";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


interface ArrowButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface CarouselProps {
  children: ReactNode;
}


const PrevArrowButton: React.FC<ArrowButtonProps> = ({onClick}) => {  
  return (
  <>
    <div className={styles.arrowLeft} onClick={onClick}>
      <FaArrowLeft />
    </div>
    </>
  );
}


const NextArrowButton: React.FC<ArrowButtonProps> = ({onClick}) => {
  return (
    <>
    <div className={styles.arrowRight} onClick={onClick}>
      <FaArrowRight />
    </div>
    </>
  );
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    dotsClass: `slick-dots ${styles.customDots}`,
    prevArrow: <PrevArrowButton />,
    nextArrow: <NextArrowButton />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]

  };


  return (
    <div className={styles.carouselContainer}>
    <Slider {...settings}>{children}</Slider>
  </div>
  )    
};

export default Carousel;
