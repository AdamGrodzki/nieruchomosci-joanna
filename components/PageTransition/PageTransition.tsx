import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, FC, useMemo } from 'react';
import ScrollProgressBar from '../ScrollProgressBar/ScrollProgressBar';

const variants = {
  hidden: { opacity: 0},
  enter: { opacity: 1},
  exit: { opacity: 0},

  // hidden: { opacity: 0, scale: 0.95 },
  // enter: { opacity: 1, scale: 1 },
  // exit: { opacity: 0, scale: 1.05 },

  // hidden: { opacity: 0, x: '100%' },
  // enter: { opacity: 1, x: '0%' },
  // exit: { opacity: 0, x: '-100%' },

  // hidden: { opacity: 0, rotate: 90 },
  // enter: { opacity: 1, rotate: 0 },
  // exit: { opacity: 0, rotate: -90 },
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
      <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        variants={variants}
        initial="hidden"
        animate="enter"
        role="region"
        exit="exit"
        transition={{ type: 'easeInOut', duration: 0.5 }}
        // transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        // transition={{ type: 'tween', duration: 0.5 }}
        // transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ position: 'relative' }}
      >
      {children}
      </motion.div>
    </AnimatePresence>
  </>
  );
};

export default PageTransition;

//above different variants for transition