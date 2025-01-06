import Head from 'next/head';
import { ReactNode, FC} from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import PageTransition from '../PageTransition/PageTransition';
import ScrollProgressBar from '../ScrollProgressBar/ScrollProgressBar';
import styles from "@/components/LayoutPage/layout.module.scss"


interface LayoutProps {
  children: ReactNode;
  isTransitioning: boolean;
}

  const Layout: FC<LayoutProps> = ({ children, isTransitioning }) => {
  return (
    <>
       <Head>
        <title>Joanna Nieruchomości </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="./public/favicon.ico"/>
      </Head>

      <ScrollProgressBar />

    <div className={styles.layout}>
      <header>
        <Navbar />
      </header>
      <main className={styles.pageContent}>
        <PageTransition>
          {children}
        </PageTransition>
        {isTransitioning && children}
      </main>

      <ArrowNavigation />
      <footer>
        <Footer />
      </footer>
    </div>
    </>
  );
};

export default Layout;