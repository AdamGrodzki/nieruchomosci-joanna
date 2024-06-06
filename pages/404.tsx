import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/404.module.css";

export default function NotFound() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 4000)
    }, [router])

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