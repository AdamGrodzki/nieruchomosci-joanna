import "@/styles/globals.scss";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/LayoutPage/Layout";
import LandingPage from "@/components/LandingPage/LandingPage";
import SearchBar from "@/components/SearchBar/SearchBar";
import PropertyTiles from "@/components/PropertyTiles/PropertyTiles";

const Loader = () => (
    <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999
    }}>
        <div className="spinner"></div>
    </div>
);

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isHomePage = router.pathname === "/";

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return (
        <Layout>
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
