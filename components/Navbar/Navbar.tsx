"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import logo from "../../images/logoDark.png"
import styles from "@/components/Navbar/navbar.module.scss"
import { useState } from "react";

import { CiMenuBurger } from "react-icons/ci";


const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = ()=> {
      setMenuOpen(!menuOpen);
    }

    const navItems = [
        {name: "Strona Główna", path: "/"},
        {name: "O Nas", path: "/o-nas"},
        {name: "Zgłoś Ofertę ", path: "/zglos-oferte"},
        {name: 'Zgłoś czego szukasz', path: '/zglos-czego-szukasz' },
        {name: 'Kontakt', path: '/kontakt' },
    ]

    return (
    <nav className={styles.nav}>
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
      <CiMenuBurger  className={`${styles.bar} ${menuOpen ? styles.menuOpen : ""}`}/>
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

