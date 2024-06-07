import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../Navbar/Navbar';
import styles from "@/components/LayoutPage/layout.module.scss"
import Footer from '../Footer/Footer';

const Layout = ({ children }: any) => {
  return (
    <>
    <div className={styles.layout}>
        <Navbar />

      <div className={styles.pageContent}>
      {children}
      </div>
      </div>
    <Footer />
    </>
  );
};

export default Layout;