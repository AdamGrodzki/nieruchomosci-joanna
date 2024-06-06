"use client"
import "@/styles/globals.css"
import Layout from "@/components/Layout/Layout";


const App = ({Component, pageProps}:any) => {
    return (
        <Layout>
        <Component {...pageProps} />
        </Layout>
     );
}
 
export default App;