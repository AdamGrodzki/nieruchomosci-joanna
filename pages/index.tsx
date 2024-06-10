import { createClient } from "contentful"
import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { PropertyProps } from "@/static/data";

import styles from "../styles/index.module.css"

export async function getStaticProps() {
    const client = createClient({
        space: "p7rgtb3cb5nz",
        // space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: "M11heMpA8FfwRHfyuVX00QDncJo5Xd6ItRXTgo0VwSs",
        // accessToken: process.env.CONTENTFUL_ACCESS_KEY,
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
        <div className={styles.container}>
    <div className={styles.propertyList}>
        {nieruchomosci.map(nieruchomosc => (
            <PropertyCard key={nieruchomosc.sys.id} nieruchomosc={nieruchomosc}/>
        ))}
        </div>
    </div>
    );
}

export default Property;