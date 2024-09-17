import { motion, useScroll } from 'framer-motion';
import styles from './ScrollProgressBar.module.scss';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div 
      className={styles.progressBarContainer}
      role="progressbar"
      aria-valuenow={scrollYProgress.get() * 100}
    >
      <motion.div
        className={styles.progressBar}
        style={{ scaleX: scrollYProgress }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }} 
      />
    </div>
  );
};

export default ScrollProgressBar;