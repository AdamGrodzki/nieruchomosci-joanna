import Navbar from '../Navbar/Navbar';
import styles from "@/components/LayoutPage/layout.module.scss"
import Footer from '../Footer/Footer';
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import Head from 'next/head';

const Layout = ({ children }: any) => {
  return (
    <>
       <Head>
        <title>Joanna Nieruchomości</title>
      </Head>

    <div className={styles.layout}>
      <header>
      <Navbar />
      </header>

      <div className={styles.pageContent}>
      {children}
      </div>
      <ArrowNavigation />
    <Footer />
      </div>
    </>
  );
};

export default Layout;