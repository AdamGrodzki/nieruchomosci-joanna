import styles from "./footer.module.scss"
import logo from "@/images/logoDark.png"
import { FaFacebook,} from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return ( 
        <footer className={styles.footer}>
            <div className={styles.footerSection}>
                <div className={styles.footerLogo}>
                    <Link href="/" aria-label="Strona główna">
                        <Image
                            src={logo}
                            width={250}
                            height={100}
                            alt="Logo Joanna Nieruchomości" />
                    </Link>
                    <p>Joanna Nieruchomości</p>
                </div>
            <ul>
            <h4>Skontaktuj Się Z Nami</h4>
                <li><MdOutlineLocationOn />
                    <a 
                        href="https://maps.app.goo.gl/5uZEP1JBUwQGHTfZ8"
                        target="_blank" 
                        rel="noopener noreferrer"
                    > Tczew, Poland 83-110
                    </a>
                </li>
                <li>
                    <BsTelephone aria-hidden="true"/>
                    <a href="tel: 884 849 400"> 884 849 400</a>
                </li>
                <li>
                    <BsTelephone aria-hidden="true"/> 
                    <a href="tel: 603 372 701 "> 603 372 701 </a>
                </li>
                <li>
                    <MdOutlineMail aria-hidden="true"/> 
                    <a href="mailto:joanna@estateapp.com"> joanna@nieruchomoscijoanna.pl</a>
                </li>
                <li>
                    <MdOutlineMail aria-hidden="true"/> 
                    <a href="mailto:sebastian@estateapp.com"> sebastian@nieruchomoscijoanna.pl</a>
                </li>
            </ul>

            <div className={styles.socialMedia}>
                <h4>Obserwuj nas</h4>
                    <Link 
                        href="https://www.facebook.com/p/Nieruchomo%C5%9Bci-Joanna-100076776466957/" 
                        aria-label="Facebook" 
                        target="_blank">
                        <FaFacebook  className={styles.facebookIcon} />
                    </Link>
            </div>
        </div>
            <div 
                className={styles.footerBottom}>
                &copy; {new Date().getFullYear()} Wszystkie prawa zastrzeżone | Joanna nieruchomości
            </div>
        </footer>
    )
}
 
export default Footer;

