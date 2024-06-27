import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import logo from "../../images/logoDark.png"
import styles from "@/components/Navbar/navbar.module.scss"
import { useEffect, useState } from "react";

import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";



const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(()=> {
      const handleScroll = ()=> {
        if(window.scrollY >=20) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll)
      };
    }, [])


    const toggleMenu = ()=> {
      setMenuOpen(!menuOpen);
    }

    const navItems = [
        {name: "Strona Główna", path: "/"},
        {name: "O Nas", path: "/AboutUs"},
        {name: "Zgłoś Ofertę ", path: "/zglos-oferte"},
        {name: 'Zgłoś czego szukasz', path: '/zglos-czego-szukasz' },
        {name: 'Kontakt', path: '/Contact' },
    ]

    return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
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
      <div className={styles.hamburger} onClick={toggleMenu}>
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
            <a className={styles.links}>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
    )
}

 
export default Navbar;

