import "@/styles/globals.scss";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/LayoutPage/Layout";
import LandingPage from "@/components/LandingPage/LandingPage";
import SearchBar from "@/components/SearchBar/SearchBar";
import PropertyTiles from "@/components/PropertyTiles/PropertyTiles";
import Loader from "@/components/Loader/Loader";

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const isHomePage = router.pathname === "/";

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleStart = () => {
            setIsLoading(true);
            setIsTransitioning(true);
            timeout = setTimeout(() => {
                setIsLoading(false);
            }, 8000); 
        };

        const handleComplete = () => {
            clearTimeout(timeout);
            setIsLoading(false);
            setIsTransitioning(false);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            clearTimeout(timeout);
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return (
        <Layout isTransitioning={isTransitioning}>
            {isLoading && <Loader />}
            {!isLoading && isHomePage && (
                <>
                    <LandingPage />
                    <SearchBar />
                    <PropertyTiles />
                </>
            )}
            {!isLoading && <Component {...pageProps} />}
        </Layout>
    );
};

export default App;
