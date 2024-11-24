import React from 'react';
import styles from "@/components/PropertyTiles/propertyTiles.module.scss";
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';

import dom from "@/images/dom1.png"
import blok from "@/images/blok.png"
import działka from "@/images/działka.png"
import lokal from "@/images/lokal.png"
import obiekt from "@/images/obiekt.png"

interface Property {
    type: string;
    img: StaticImageData;
}

const properties: Property[] = [
    { type: 'Mieszkanie', img: blok },
    { type: 'Dom', img: dom },
    { type: 'Działka', img: działka },
    { type: 'Lokal', img: lokal },
    { type: 'Obiekt', img: obiekt }
];

const PropertyTiles: React.FC = () => {
    const router = useRouter();

    const handleTileClick = (propertyType: string, transactionType: string) => {
        router.push({
            pathname: '/searchResults',
            query: {typeOfProperty: propertyType, transactionType}
        });
    };

    return (
        <div className={styles.container}>
            {properties.map(({type, img}) => (
                <div
                    key={type}
                    className={styles.tile}
                >
                    <div className={styles.front}>
                        <Image
                        src={img}
                        alt={`${type} card`}
                        />
                <h2>{type}</h2>
                </div>
                
                <div className={styles.back}>
                        <button onClick={() => handleTileClick(type, 'Wynajem')}>Wynajem</button>
                        <button onClick={() => handleTileClick(type, 'Sprzedaż')}>Sprzedaż</button>
                    </div>
            </div>
        ))}
    </div>
    );
};

export default PropertyTiles;
