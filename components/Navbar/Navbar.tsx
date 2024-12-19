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
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            const yOffset = -50;
            const y = section.offsetTop + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

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
        },
        [router]
    );

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

    useEffect(() => {
        const handleBackNavigation = () => {
            setMenuOpen(false);
        };

        window.addEventListener("popstate", handleBackNavigation);

        return () => {
            window.removeEventListener("popstate", handleBackNavigation);
        };
    }, []);

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

    const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

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
