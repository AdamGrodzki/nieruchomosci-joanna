import styles from "@/components/Loader/loader.module.scss"
import load from "@/images/loader.gif"
import Image from "next/image";



const Loader = () => {
    return (
        <>
        <div className={styles.loader}>
        <Image className={styles.fiLoader} src={load} alt="loader gif" />
        </div>
        </>
     );
}
 
export default Loader;