import { useEffect, useMemo, useState, useCallback, useRef } from "react";
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
    const menuRef = useRef<HTMLUListElement>(null);

    const closeMenu = useCallback(() => setMenuOpen(false), []);
    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY >= 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) closeMenu();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [closeMenu]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeMenu]);

    const navItems = useMemo(() => [
        { name: "Strona Główna", path: "/" },
        { name: "O Nas", path: "/o-nas" },
        { name: "Zgłoś Ofertę", path: "/zglos-oferte" },
        { name: 'Kontakt', path: '/kontakt' },
    ], []);

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
            <ul ref={menuRef} className={`${styles.unorderedList} ${menuOpen ? styles.showMenu : ""}`}>
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