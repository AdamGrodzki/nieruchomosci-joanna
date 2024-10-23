import Carousel from "@/components/Carousel/Carousel";
import FeaturedProperties from "@/components/FeaturedProperties/FeaturedProperties";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import styles from "../styles/index.module.scss";
import {client} from "@/lib/contentful";
import { Nieruchomosc, PropertyProps} from "@/static/data";

export async function getStaticProps() {
    const res = await client.getEntries({content_type: "nieruchomosc"});

    return {
        props: {
        nieruchomosci: res.items,
        },
        revalidate: 1,
    };
}

const Property: React.FC<PropertyProps> = ({nieruchomosci}) => {
    console.log(nieruchomosci);
    return(
    <>
            <FeaturedProperties nieruchomosci={nieruchomosci} />
        <div>
            <div className={styles.container}>
            <h2 className={styles.heading}>Najnowsze Oferty</h2>
                <div className={styles.propertyList}>
                    <Carousel className={styles.carousel}>
                        {nieruchomosci.map((nieruchomosc: Nieruchomosc) => (
                        <PropertyCard 
                        key={nieruchomosc.sys.id} 
                        nieruchomosc={nieruchomosc}
                        />
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
        </>
    );
}

export default Property;




