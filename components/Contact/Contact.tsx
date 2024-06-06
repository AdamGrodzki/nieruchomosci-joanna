"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";



const Contact = () => {

    const router = useRouter();

    useEffect(() => {
        router.push("/kontakt")
    }, [router])

    return ( 
        <h1>Kontakt Page </h1>
     );
}
 
export default Contact;