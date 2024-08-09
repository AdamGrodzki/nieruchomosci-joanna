import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, FC } from 'react';
import ScrollProgressBar from '../ScrollProgressBar/ScrollProgressBar';

const variants = {
  hidden: { opacity: 0},
  enter: { opacity: 1},
  exit: { opacity: 0},
};

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: FC<PageTransitionProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
    <ScrollProgressBar />
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.route}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear', duration: 0.4 }}
        style={{ position: 'relative' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </>
  );
};

export default PageTransition;