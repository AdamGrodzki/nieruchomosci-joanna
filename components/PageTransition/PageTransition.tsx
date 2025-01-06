import { ReactNode, useState, useEffect } from 'react';
import styles from './pageTransition.module.scss';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const [animationState, setAnimationState] = useState('fadeEnter');

    useEffect(() => {
        setAnimationState('fadeEnterActive');
        const timer = setTimeout(() => setAnimationState('fadeExitActive'), 200);
        return () => clearTimeout(timer);
    }, [children]);

    return (
        <div className={`${styles.transitionContainer} ${styles[animationState]}`}>
            {children}
        </div>
    );
};

export default PageTransition;