import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import styles from "@/styles/carousel.module.css"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';



function NextArrowButton(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className} 
      style={{ ...style, display: "block", background: "black"  }}
      onClick={onClick}
    />
  );
}

function PrevArrowButton(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className} 
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}


const Carousel = ({ children }:any) => {
  const settings = {
    dots: true,
    initialSlide: 0,
    arrows: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    dotsClass: `slick-dots ${styles.customDots}`,

    nextArrow: <NextArrowButton />,
    prevArrow: <PrevArrowButton />,
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
