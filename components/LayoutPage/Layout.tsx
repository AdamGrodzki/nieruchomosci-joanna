import { ReactNode, FC} from 'react';
import Navbar from '../Navbar/Navbar';
import styles from "@/components/LayoutPage/layout.module.scss"
import Footer from '../Footer/Footer';
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import Head from 'next/head';
import PageTransition from '../PageTransition/PageTransition';
import ScrollProgressBar from '../ScrollProgressBar/ScrollProgressBar';

interface LayoutProps {
  children: ReactNode;
}

  const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
       <Head>
        <title>Joanna Nieruchomości</title>
      </Head>
      <ScrollProgressBar />
    <div className={styles.layout}>
      <header>
      <Navbar />
      </header>
      <PageTransition>
      <div className={styles.pageContent}>
      {children}
      </div>
      </PageTransition>
      <ArrowNavigation />
    <Footer />
      </div>
    </>
  );
};

export default Layout;