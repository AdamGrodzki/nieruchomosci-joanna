import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './landingPage.module.scss'; 
import img1 from "../../images/kitchen.jpg";
import img2 from "../../images/living-room2.jpg";
import img3 from "../../images/living-room3.jpg";
import logo from "../../images/logoDark.png";


const images = [ img1, img2, img3];

const LandingPage = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 300); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);


  const handleDotClick = (index:number) => {
    setFade(true);    
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(false);
    }, 500); 
  };

  return (
    <div className={styles.parentContainer}>
      <div className={`${styles.hero} ${fade ? styles.fadeOut : styles.fadeIn}`}>
        <Image
          src={images[currentIndex]}
          alt="Carousel Image"
          layout="fill"
          priority={true}
        />
        <div className={styles.heroContent}>
          <Image
            src={logo}
            height={400}
            width={400}
            alt="logo-nieruchomosci"
            priority={true}
          />
        </div>
      </div>
      <div className={styles.pagination}>
        {images.map((_,index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
            onClick={() => handleDotClick(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default LandingPage;
