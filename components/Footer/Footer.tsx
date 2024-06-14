import styles from "./footer.module.scss"
import { FaFacebookF, } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";


const Footer = () => {
    return ( 
        <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerSection}>
                <h4>Skontaktuj Się Z Nami</h4>
                <ul>
                    <li>Nieruchomosci Joanna</li>
                    <li><MdOutlineLocationOn /> Tczew, Poland 83-110</li>
                    <li><BsTelephone /> <a  href="tel: 123 456 789"> 123 456 789</a></li>
                    <li><BsTelephone /> <a href="tel: 987 654 321"> 987 654 321</a></li>
                    <li><MdOutlineMail /> <a href="mailto:joanna@estateapp.com"> joanna@estateapp.com</a></li>
                    <li><MdOutlineMail /> <a href="mailto:sebastian@estateapp.com"> sebastian@estateapp.com</a></li>
                </ul>
            </div>
        
            <div className={styles.footerSection}> 
                <h4>Obserwuj nas</h4>
                <div className={styles.socialMedia}>
                    <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className={styles.facebookIcon}/>
                    </a>
                </div>
            </div>
        </div>
        <div>
            &copy; 2024 Wszystkie prawa zastrzeżone | Joanna nieruchomości 
        </div>
    </footer>
     );
}
 
export default Footer;