import Link from "next/link";
import styles from "@/styles/404.module.css";

const NotFound = () => {

    return (
        <div className={styles.notFoundContainer}>
        <div className={styles.notFoundContent}>
          <h1 className={styles.headingOne}>Błąd 404</h1>
          <h2 className={styles.headingTwo}>Strona nie znaleziona!</h2>
          <p>
            Wróć do <Link href="/">Strony głównej</Link>. Znajdziemy to, czego
            szukasz.
          </p>
        </div>
        </div>
    );
    
}

export default NotFound;