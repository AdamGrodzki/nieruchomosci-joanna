import styles from "@/components/Loader/loader.module.scss"
import { FiLoader } from "react-icons/fi";
import load from "@/images/loader.gif"
import Image from "next/image";

import { FaBuilding } from "react-icons/fa";


const Loader = () => {
    return (
        <>
        <div className={styles.loader}>
        {/* <FiLoader className={styles.fiLoader}/> */}
        <Image className={styles.fiLoader} src={load} alt="load" />
        </div>
        </>
     );
}
 
export default Loader;