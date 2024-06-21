import Navbar from '../Navbar/Navbar';
import styles from "@/components/LayoutPage/layout.module.scss"
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import SearchBar from '../SearchBar/SearchBar';

const Layout = ({ children }: any) => {
  const images = ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1']
  return (
    <>
    <div className={styles.layout}>
        <Navbar />

      <LandingPage />
      <SearchBar />
      <div className={styles.pageContent}>
      {children}
      </div>
      </div>
      <ArrowNavigation />
    <Footer />
    </>
  );
};

export default Layout;