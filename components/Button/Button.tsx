import { useRouter } from "next/router";
import styles from "@/components/Button/button.module.scss"

const Button = () => {
const router = useRouter()

const handleBackButton = ()=> {
    router.push("/");
}
    return ( 
        <button className={styles.prevButton} onClick={handleBackButton}>Cofnij</button>
     );
}
 
export default Button;