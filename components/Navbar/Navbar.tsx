"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import logoDark from "../../images/nieruchomosci-Logo-dark.png"
import styles from "@/components/Navbar/navbar.module.scss"


const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        {name: "Strona Główna", path: "/"},
        {name: "O Nas", path: "/o-nas"},
        {name: "Zgłoś Ofertę ", path: "/zglos-oferte"},
        {name: 'Zgłoś czego szukasz', path: '/zglos-czego-szukasz' },
        {name: 'Kontakt', path: '/kontakt' },
    ]

    return (
    <nav className={styles.nav}>
      <Image  
      className={styles.logo}
      src={logoDark}
      width={50}
      height={50}
      alt="logo-white"
      />
    <ul className={styles.unorderedList}>
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

