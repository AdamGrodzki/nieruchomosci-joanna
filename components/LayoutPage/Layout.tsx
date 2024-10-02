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
}

export const metadata = {
  title: "Joanna Nieruchomości - Nieruchomości w Tczewie",
  icons: {
    icon: ['/favicon.ico']
  }
}

  const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
       <Head>
        <title>{metadata.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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