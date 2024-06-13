import { createClient } from "contentful"
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { PropertyProps } from "@/static/data";

import styles from "../styles/index.module.css"

export async function getStaticProps() {
    const client = createClient({
        space: String(process.env.CONTENTFUL_SPACE_ID),
        accessToken: String(process.env.CONTENTFUL_ACCESS_KEY),
      })

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
        {nieruchomosci.map(nieruchomosc => (
            <PropertyCard key={nieruchomosc.sys.id} nieruchomosc={nieruchomosc}/>
        ))}
        </div>
    </div>
    </div>);
}

export default Property;