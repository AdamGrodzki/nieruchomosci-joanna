import "@/styles/globals.scss";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "@/components/LayoutPage/Layout";
import HomeContent from "@/components/HomeContent";

const App = ({Component, pageProps}: AppProps) => {
    const router = useRouter();
    const isHomePage = router.pathname === "/";

    return (
        <Layout>
          {isHomePage && <HomeContent/>}
            <Component {...pageProps} />
        </Layout>
     );
}
 
export default App;