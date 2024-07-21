import "@/styles/globals.css"
import Layout from "@/components/LayoutPage/Layout";

import { AppProps } from "next/app";

import { useRouter } from "next/router";
import LandingPage from "@/components/LandingPage/LandingPage";
import SearchBar from "@/components/SearchBar/SearchBar";

const App = ({Component, pageProps}: AppProps) => {
    const router = useRouter();
    const isHomePage = router.pathname === "/";

    return (
        <>
        <Layout>
        {isHomePage && <LandingPage />}
        {isHomePage && <SearchBar />}
        <Component {...pageProps} />
        </Layout>
        </>
     );
}
 
export default App;

