import Head from 'next/head';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Moja strona</title>
        <h1>Hello Page</h1>
        {/* Dodaj inne metadane */}
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;