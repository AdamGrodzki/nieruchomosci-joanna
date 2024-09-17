import styles from "@/components/Loader/loader.module.scss"
import loader from "@/images/loader.gif"
import Image from "next/image";

const Loader = () => {
    return (
        <div className={styles.loader} aria-live="polite" aria-busy="true">
            <Image 
                src={loader}
                width={70}
                height={70}
                alt="Ładowanie treści, proszę czekać..." 
                priority
            />
        </div>
     );
}
 
export default Loader;