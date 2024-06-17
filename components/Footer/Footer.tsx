import styles from "./footer.module.scss"
import logo from "@/images/logoDark.png"
import { FaFacebook } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";



const Footer = () => {
    return ( 
    <>
        <footer className={styles.footer}>
            <div className={styles.footerSection}>
                <div className={styles.footerLogo}>
                    <Link href="/">
                        <Image
                            src={logo}
                            width={250}
                            height={100}
                            alt="logo" />
                    </Link>
                    <p>Joanna Nieruchomości</p>
                </div>
                <ul>
            <h4>Skontaktuj Się Z Nami</h4>
                    <li><MdOutlineLocationOn /><a target="_blank" href="https://maps.app.goo.gl/5uZEP1JBUwQGHTfZ8"> Tczew, Poland 83-110</a></li>
                    <li><BsTelephone /> <a href="tel: 123 456 789"> 123 456 789</a></li>
                    <li><BsTelephone /> <a href="tel: 987 654 321"> 987 654 321</a></li>
                    <li><MdOutlineMail /> <a href="mailto:joanna@estateapp.com"> joanna@estateapp.com</a></li>
                    <li><MdOutlineMail /> <a href="mailto:sebastian@estateapp.com"> sebastian@estateapp.com</a></li>
                </ul>
                <div className={styles.socialMedia}>
            <h4>Obserwuj nas</h4>
                    <Link href="https://facebook.com" aria-label="Facebook" target="_blank">
                        <FaFacebook  className={styles.facebookIcon} />
                    </Link>
                </div>
            </div>
        </footer>
            <div className={styles.footerBottom}>
                &copy; 2024 Wszystkie prawa zastrzeżone | Joanna nieruchomości
            </div>
    </>
     );
}
 
export default Footer;

