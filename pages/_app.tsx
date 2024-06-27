import "@/styles/globals.css"
import Layout from "@/components/LayoutPage/Layout";
import Navbar from "@/components/Navbar/Navbar";
import LandingPage from "@/components/LandingPage/LandingPage";

import { useRouter } from "next/router";

const App = ({Component, pageProps}:any) => {
    const router = useRouter();
    const landingPageRoutes = ['/'];

    return (
        <>
        {/* <Navbar /> */}
        {landingPageRoutes.includes(router.pathname) && <Layout />}
        {/* <Layout > */}
        <Component {...pageProps} />
        {/* </Layout> */}
        </>
     );
}
 
export default App;

