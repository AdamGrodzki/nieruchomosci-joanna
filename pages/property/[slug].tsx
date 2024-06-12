import { PropertyProps } from "@/static/data"
import { createClient } from "contentful"

const client = createClient({
    space: String(process.env.CONTENTFUL_SPACE_ID),
    accessToken: String(process.env.CONTENTFUL_ACCESS_KEY),
  })

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: "nieruchomosc"
    })


    const paths = res.items.map(item => {
        return {
            params: {slug: item.fields.slug}
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}:any) {
    const { items } = await client.getEntries({
        content_type: "nieruchomosc",
        "fields.slug": params.slug
    })

    return {
        props: {nieruchomosci: items[0]}
    }
}

const PropertyDetails: React.FC<PropertyProps> = ({nieruchomosci}) =>{
    console.log(nieruchomosci);
    
    return (
        <div>
            Property Details
        </div>
    )
}

export default PropertyDetails;