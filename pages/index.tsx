import { createClient } from "contentful"
import PropertyCard from "@/components/PropertyCard/PropertyCard";


interface Nieruchomosc {
    sys: {
        id: string;
    };
    fields: {
        title: string;
    }
}

interface PropertyProps {
    nieruchomosci: Nieruchomosc[];
}

export async function getStaticProps() {
    const client = createClient({
        space: "p7rgtb3cb5nz",
        accessToken: "M11heMpA8FfwRHfyuVX00QDncJo5Xd6ItRXTgo0VwSs",
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
        {nieruchomosci.map(nieruchomosc => (
            <PropertyCard key={nieruchomosc.sys.id} nieruchomosc={nieruchomosc}/>
        ))}
    </div>
    );
}

export default Property;