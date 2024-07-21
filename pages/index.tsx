import { PropertyProps } from "@/static/data";
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import styles from "../styles/index.module.css"
import {client} from "@/lib/contentful"
import Carousel from "@/components/Carousel/Carousel";


export async function getStaticProps() {
    const res = await client.getEntries({content_type: "nieruchomosc"})

    return {
        props: {nieruchomosci: res.items},
        revalidate: 1,
    };
}

const Property: React.FC<PropertyProps> = ({nieruchomosci}) => {
    console.log(nieruchomosci);
    return(
        <div>
            <h2 className={styles.heading}>Najnowsze Oferty</h2>
        <div className={styles.container}>
    <div className={styles.propertyList}>
            <Carousel className={styles.carousel}>
        {nieruchomosci.map(nieruchomosc => (
            <PropertyCard key={nieruchomosc.sys.id} nieruchomosc={nieruchomosc}/>
        ))}
        </Carousel>
        </div>
    </div>
    </div>
    );
}

export default Property;