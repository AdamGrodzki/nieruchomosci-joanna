import { ReactNode, useState, useEffect } from 'react';
import styles from './pageTransition.module.scss';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const [animationState, setAnimationState] = useState('fadeEnter');

    useEffect(() => {
        setAnimationState('fadeEnter-active');
        const timer = setTimeout(() => setAnimationState('fadeExit-active'), 500);
        return () => clearTimeout(timer);
    }, [children]);

    return (
        <div className={`${styles.transitionContainer} ${styles[animationState]}`}>
            {children}
        </div>
    );
};

export default PageTransition;