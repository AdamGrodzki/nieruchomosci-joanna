import React, {useState} from 'react';
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
    const [hoveredTile, setHoveredTile] = useState<string>();

    const handleTileClick = (propertyType: string, transactionType: string) => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('typeOfProperty', propertyType);
        currentParams.set('transactionType', transactionType);
        router.push(`/searchResults?${currentParams.toString()}`);
    };

    return (
        <div className={styles.container}>
        {[
            { type: 'Mieszkania', img: blok },
            { type: 'Dom', img: dom },
            { type: 'Działka', img: działka },
            { type: 'Lokal', img: lokal },
            { type: 'Obiekt', img: obiekt }
        ].map(({ type, img }) => (
            <div
                key={type}
                className={styles.tile}
                onMouseEnter={() => setHoveredTile(type)}
                onMouseLeave={() => setHoveredTile("")}
            >
                <Image src={img} alt={`${type} cards`} />
                <h2>{type}</h2>
                {hoveredTile === type && (
                    <div className={styles.searchBox}>
                        <button onClick={() => handleTileClick(type, 'Wynajem')}>Wynajem</button>
                        <button onClick={() => handleTileClick(type, 'Sprzedaż')}>Sprzedaż</button>
                    </div>
                )}
            </div>
        ))}
    </div>
    );
};

export default PropertyTiles;
