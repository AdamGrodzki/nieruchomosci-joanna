import { useState, useEffect } from "react";
import styles from "@/components/ArrowNavigation/arrowNavigation.module.scss"
import { FaArrowUp } from "react-icons/fa";


const ArrowNavigation = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            setShowButton(scrollPosition > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return ( 
        <>
            {showButton && (
                <button className={styles.arrowUp} onClick={scrollToTop}>
                    <FaArrowUp /> 
                </button>
            )}
        </>
     );
}
 
export default ArrowNavigation;