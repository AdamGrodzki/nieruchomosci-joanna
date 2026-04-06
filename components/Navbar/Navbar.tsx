import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import logo from "../../images/logoDark.png";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import styles from "@/components/Navbar/navbar.module.scss";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    // Obsługuje przewijanie i zmienia stan na podstawie scrolla
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Funkcja przewijania do sekcji
    const scrollToSection = useCallback((id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const yOffset = -70; // Zmienna dla dostosowania offsetu
            const y = section.offsetTop + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }, []);

    // Obsługuje kliknięcie w "Oferty wyróżnione"
    const handleScroll = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            const sectionId = "featuredSection";
            if (router.pathname === "/") {
                scrollToSection(sectionId);
            } else {
                router.push("/#featuredSection").then(() => {
                    scrollToSection(sectionId);
                });
            }

            // Zamknięcie menu po kliknięciu w "Oferty wyróżnione"
            closeMenu();
        },
        [router, scrollToSection, closeMenu] // Dodajemy closeMenu jako zależność
    );

    // Obsługuje kliknięcie na zewnątrz menu, aby je zamknąć
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Zmienna nawigacyjna
    const navItems = useMemo(
        () => [
            { name: "Strona Główna", path: "/" },
            { name: "Oferty wyróżnione", anchor: true },
            { name: "O Nas", path: "/o-nas" },
            { name: "Zgłoś Ofertę", path: "/zglos-oferte" },
            { name: "Kontakt", path: "/kontakt" },
        ],
        []
    );

    // Przełączenie menu
    const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

      // Zamknięcie menu po kliknięciu przycisku cofnięcia
      useEffect(() => {
        const handlePopState = () => {
            setMenuOpen(false);
        };

        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`} ref={menuRef}>
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
                onKeyPress={(e) => e.key === "Enter" && toggleMenu()}
                aria-expanded={menuOpen ? "true" : "false"}
            >
                <div className={styles.menuIcon}>
                    {menuOpen ? (
                        <FaTimes className={`${styles.timesIcon} ${styles.menuIconActive}`} />
                    ) : (
                        <CiMenuBurger className={`${styles.burgerIcon} ${styles.menuIconActive}`} />
                    )}
                </div>
            </div>

            <ul className={`${styles.unorderedList} ${menuOpen ? styles.showMenu : styles.hideMenu}`}>
                {navItems.map((item) => (
                    <li key={item.name} className={pathname === item.path ? styles.active : styles.listItem}>
                        {item.anchor ? (
                            <a className={styles.links} onClick={handleScroll}>
                                {item.name}
                            </a>
                        ) : (
                            item.path && (
                                <Link legacyBehavior href={item.path}>
                                    <a className={styles.links} onClick={closeMenu}>
                                        {item.name}
                                    </a>
                                </Link>
                            )
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;