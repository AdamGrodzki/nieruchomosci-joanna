import "@/styles/globals.css"
import Layout from "@/components/LayoutPage/Layout";
import Navbar from "@/components/Navbar/Navbar";
import LandingPage from "@/components/LandingPage/LandingPage";
import Footer from "@/components/Footer/Footer"

import { useRouter } from "next/router";

const App = ({Component, pageProps}:any) => {
    const router = useRouter();
    const landingPageRoutes = ['/'];

    return (
        <>
        {/* <Layout > */}
        {landingPageRoutes.includes(router.pathname) && <Layout />}
        <Component {...pageProps} />
        <Footer/>
        {/* </Layout> */}
        </>
     );
}
 
export default App;

