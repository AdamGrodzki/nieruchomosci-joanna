import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import styles from '@/components/FeaturedProperties/featuredProperties.module.scss'
import { FeaturedPropertiesProps, Nieruchomosc} from "@/static/data";


const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ nieruchomosci }) => {
    const featuredNieruchomosci = nieruchomosci.filter((nieruchomosc: Nieruchomosc) => nieruchomosc.fields.special === true);

    if (!featuredNieruchomosci || 
        featuredNieruchomosci.length === 0) {
        return <p className={styles.noOffer}>Brak wyróżnionych ofert 🙁</p>;
    }

    return (
        <div className={styles.featuredSection}>
            <h2>Wyróżnione Oferty</h2>
            <div className={styles.featuredList}>
                {featuredNieruchomosci.map((nieruchomosc: Nieruchomosc) => (
                    <div className={styles.propertyWrapper} key={nieruchomosc.sys.id}>
                        <PropertyCard nieruchomosc={nieruchomosc} />
                        <div className={styles.specialOfferBadge}>Oferta Specjalna</div> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProperties;
