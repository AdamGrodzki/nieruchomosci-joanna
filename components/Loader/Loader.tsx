import styles from "@/components/Loader/loader.module.scss"
import { FiLoader } from "react-icons/fi";

import { FaBuilding } from "react-icons/fa";


const Loader = () => {
    return (
        <>
        <div className={styles.loader}>
        <FiLoader className={styles.fiLoader}/>
        </div>
        </>
     );
}
 
export default Loader;