import { motion, useScroll } from 'framer-motion';
import styles from './ScrollProgressBar.module.scss';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className={styles.progressBarContainer}>
      <motion.div
        className={styles.progressBar}
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default ScrollProgressBar;