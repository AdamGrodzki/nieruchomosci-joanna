import Navbar from '../Navbar/Navbar';
import styles from "@/components/LayoutPage/layout.module.scss"
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';

const Layout = ({ children }: any) => {
  return (
    <>
    <div className={styles.layout}>
        <Navbar />

      <LandingPage />
      <div className={styles.pageContent}>
      {children}
      </div>
      </div>
    <Footer />
    </>
  );
};

export default Layout;