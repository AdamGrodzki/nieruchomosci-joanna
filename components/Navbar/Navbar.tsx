import { useEffect, useMemo, useState, useCallback } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import logo from "../../images/logoDark.png";
import styles from "@/components/Navbar/navbar.module.scss";

const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navItems = useMemo(() => [
        { name: "Strona Główna", path: "/" },
        { name: "O Nas", path: "/o-nas" },
        { name: "Zgłoś Ofertę", path: "/zglos-oferte" },
        { name: 'Zgłoś czego szukasz', path: '/zglos-czego-szukasz' },
        { name: 'Kontakt', path: '/kontakt' },
    ], []);

    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
            <Link href="/">
                <Image        
                    className={styles.logo}
                    src={logo}
                    width={160}
                    height={70}
                    alt="logo-white"
                    fetchPriority="high"
                />
            </Link>
            <div 
                className={styles.hamburger} 
                onClick={toggleMenu} 
                aria-label="Toggle menu" 
                role="button" 
                tabIndex={0}
            >
                <div className={styles.menuIcon}>
                    {menuOpen ? (
                        <FaTimes className={`${styles.timesIcon} ${styles.menuIconActive}`} />
                    ) : (
                        <CiMenuBurger className={`${styles.burgerIcon} ${styles.menuIconActive}`} />
                    )}
                </div>
            </div>
            <ul className={`${styles.unorderedList} ${menuOpen ? styles.showMenu : ""}`}>
                {navItems.map(item => (
                    <li key={item.path} className={pathname === item.path ? styles.active : styles.listItem}>
                        <Link legacyBehavior href={item.path}>
                            <a className={styles.links} onClick={closeMenu}>{item.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;