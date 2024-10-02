import Link from "next/link";
import styles from "@/styles/404.module.scss";

const NotFound = () => {

    return (
        <div className={styles.notFoundContainer}>
          <div className={styles.notFoundContent}>
            <h1 className={styles.headingOne} aria-label="Error 404">Błąd 404</h1>
            <h2 className={styles.headingTwo}>Strona nie znaleziona!</h2>
              <p>Przepraszamy, ale nie możemy znaleźć strony, której szukasz. 
            Wróć do <Link className={styles.homeLink} href="/" passHref>strony głównej</Link>, aby kontynuować przeglądanie.
              </p>
          </div>
        </div>
    );
    
}

export default NotFound;