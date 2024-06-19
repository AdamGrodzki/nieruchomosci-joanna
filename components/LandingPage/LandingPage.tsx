import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './landingPage.module.scss'; 
import img from "../../images/kitchen.jpg";
import img1 from "../../images/living-room2.jpg"
import img2 from "../../images/living-room3.jpg"
import logo from "../../images/logoDark.png"

const images = [ img, img1, img2];

// const LandingPage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 1000); 
    
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={styles.parentContainer}>
//       <div className={styles.hero}>
//         <Image
//         src={images[currentIndex]}
//         alt="Carousel Image"
//         layout="fill"
//         priority={true}
//       />
//         <div className={styles.heroContent}>
//           <Image
//             src={logo}
//             height={400}
//             width={400}
//             alt="logo-nieruchomosci"
//             priority={true}
//           />
//         </div>
//       </div>
//       </div>
//   );
// };

// export default LandingPage;

const LandingPage = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500); // Duration of the fade out animation
    }, 4000); // Duration for each image display

    return () => clearInterval(interval);
  }, []);

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
    </div>
  );
};

export default LandingPage;