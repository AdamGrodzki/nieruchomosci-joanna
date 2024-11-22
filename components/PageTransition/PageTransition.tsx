import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, FC, useMemo } from 'react';
import ScrollProgressBar from '../ScrollProgressBar/ScrollProgressBar';

const variants = {
  hidden: { opacity: 0},
  enter: { opacity: 1},
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
        style={{ position: 'relative' }}
      >
      {children}
      </motion.div>
    </AnimatePresence>
  </>
  );
};

export default PageTransition;
