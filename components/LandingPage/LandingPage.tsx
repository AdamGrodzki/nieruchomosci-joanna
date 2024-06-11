import Image from "next/image";
import styles from "./landingPage.module.scss"
import logo from "@/images/nieruchomosci-Logo-dark.png"


const LandingPage = () => {
    return (
      <div className={styles.parentContainer}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Image
            src={logo}
            height={450}
            width={700}
            alt="logo-nieruchomosci"
            priority={true}
          />
        </div>
      </div>
      </div>
    );
  }
  
  export default LandingPage;