import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar/Navbar';
import styles from "@/components/Layout/layout.module.scss"
import Footer from '../Footer/Footer';

const Layout = ({ children }: any) => {
  return (
    <>
    <div className={styles.layout}>
      <header>
        <Navbar />
      </header>

      <div className={styles.pageContent}>
      {children}
      </div>
      </div>
    <Footer />
    </>
  );
};

export default Layout;