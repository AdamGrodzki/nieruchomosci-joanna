import { PropertyCardProps } from "@/static/data"
import { createClient } from "contentful"
import Image from "next/image"

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

export async function getStaticProps({params}: any) {
    const { items } = await client.getEntries({
        content_type: "nieruchomosc",
        "fields.slug": params.slug
    })

    return {
        props: {nieruchomosci: items[0]}
    }
}

const PropertyDetails:  React.FC<PropertyCardProps> = ({ nieruchomosci}: any) =>{
    console.log(nieruchomosci);
    
    return (
        <div>
            <p>{nieruchomosci.fields.title}</p>
            <p>{nieruchomosci.fields.address}</p>
            <p>{nieruchomosci.fields.area}</p>
            <Image 
                  src={"https:" + nieruchomosci.fields.gallery.fields.file.url}
                  height={400}
                  width={600}
                  alt="img"
                  priority={true}
                />
        </div>
    )
}

export default PropertyDetails;