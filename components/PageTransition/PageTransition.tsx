import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, FC, useMemo } from 'react';
import ScrollProgressBar from '../ScrollProgressBar/ScrollProgressBar';
import { exit } from 'process';

const variants = {
  hidden: { opacity: 0},
  enter: { opacity: 1},
  exit: {opacity: 1},
};

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: FC<PageTransitionProps> = ({ children }) => {
  const router = useRouter();

  const key = useMemo(() => router.route, [router.route]);

  return (
    <>
      <ScrollProgressBar />
      <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={key}
        variants={variants}
        exit="exit"
        initial="hidden"
        animate="enter"
        role="region"
        transition={{ type: 'easeInOut', duration: 0.8}}
        style={{ position: 'relative'}}
      >
      {children}
      </motion.div>
    </AnimatePresence>
  </>
  );
};
export default PageTransition;
