import styles from "./footer.module.scss"
import { FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa";

const Footer = () => {
    return ( 
        <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerSection}>
                <h4>Contact Us</h4>
                <ul>
                    <li>Nieruchomosci Joanna</li>
                    <li>Tczew, Poland 83-110</li>
                    <li>123-456-789</li>
                    <li>987-654-321</li>
                    <li><a href="mailto:joanna@estateapp.com">joanna@estateapp.com</a></li>
                    <li><a href="mailto:sebastian@estateapp.com">sebastian@estateapp.com</a></li>
                </ul>
            </div>
        
            <div className={styles.footerSection}>
                <h4>Follow Us</h4>
                <div className={styles.socialMedia}>
                    <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                    </a>
                    <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                    </a>
                    <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
        <div>
      

            &copy; 2024 Estate App. All rights reserved.
        </div>
    </footer>
     );
}
 
export default Footer;