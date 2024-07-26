import React from 'react';
import styles from "@/components/PropertyTiles/propertyTiles.module.scss";
import Image from 'next/image';
import { useRouter } from 'next/router';

import dom from "@/images/dom1.png"
import blok from "@/images/blok.png"
import działka from "@/images/działka.png"
import lokal from "@/images/lokal.png"
import obiekt from "@/images/obiekt.png"

const PropertyTiles = () => {
    const router = useRouter();

    const handleTileClick = (propertyType: string) => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('typeOfProperty', propertyType);
        router.push(`/searchResults?${currentParams.toString()}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.tile} onClick={() => handleTileClick('Mieszkanie')}>
                <Image src={blok} alt='src' />
                <h2>Mieszkania</h2>
            </div>
            <div className={styles.tile} onClick={() => handleTileClick('Dom')}>
                <Image src={dom} alt='src' />
                <h2>Domy</h2>
            </div>
            <div className={styles.tile} onClick={() => handleTileClick('Działka')}>
                <Image src={działka} alt='src' />
                <h2>Działki</h2>
            </div>
            <div className={styles.tile} onClick={() => handleTileClick('Lokal')}>
                <Image src={lokal} alt='src' />
                <h2>Lokale</h2>
            </div>
            <div className={styles.tile} onClick={() => handleTileClick('Obiekt')}>
                <Image src={obiekt} alt='src' />
                <h2>Obiekty</h2>
            </div>
        </div>
    );
};

export default PropertyTiles;