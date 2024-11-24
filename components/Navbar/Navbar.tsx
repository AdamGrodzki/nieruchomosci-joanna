import { useEffect, useMemo, useState, useCallback } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import logo from "../../images/logoDark.png";
import styles from "@/components/Navbar/navbar.module.scss";
import { useRouter } from "next/router";  

const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter(); 
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);

        if (!section) return;  

        const yOffset = -50; 
        const y = section.offsetTop + yOffset; 

        window.scrollTo({ top: y, behavior: "smooth" });
    };

    const handleScroll = (e:any) => {
        e.preventDefault();
        if (router.pathname === "/") {
            scrollToSection("featuredSection");
        } else {
            router.push('/#featuredSection').then(() => {
                scrollToSection("featuredSection");
            });
        }
    };

    useEffect(() => {
        const scrollTo = new URLSearchParams(window.location.search).get("/#featuredSection");
        if (scrollTo) {
            scrollToSection(scrollTo);
        }
    }, []);

    // Elementy nawigacji
    const navItems = useMemo(() => [
        { name: "Strona Główna", path: "/" },
        { name: 'Oferty wyróżnione', anchor: true },  
        { name: "O Nas", path: "/o-nas" },
        { name: "Zgłoś Ofertę", path: "/zglos-oferte" },
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
                onKeyPress={(e) => e.key === 'Enter' && toggleMenu()}
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
                    <li key={item.name} className={pathname === item.path ? styles.active : styles.listItem}>
                        {item.anchor ? (
                            <a className={styles.links} onClick={handleScroll}>{item.name}</a> 
                        ) : (
                            item.path ? (
                            <Link legacyBehavior href={item.path}>
                                <a className={styles.links} onClick={closeMenu}>{item.name}</a>
                            </Link>
                            ) : null
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
