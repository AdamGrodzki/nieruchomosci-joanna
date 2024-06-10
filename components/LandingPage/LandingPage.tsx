import styles from "./landingPage.module.scss"

const LandingPage = () => {
    return (
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Our Estate App</h1>
          <p>Your dream home awaits.</p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </div>
    );
  }
  
  export default LandingPage;