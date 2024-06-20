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
            <div>
            <h2>Nieruchomość na {nieruchomosci.fields.tranactionType}</h2>
            <p>{nieruchomosci.fields.address}</p>
            </div>
            <h3>{nieruchomosci.fields.title}</h3>
            <p>{nieruchomosci.fields.price.toFixed(2)} zł</p>
            <p>{nieruchomosci.fields.typeOfProperty}</p>
            <p>{nieruchomosci.fields.area} m²</p>
            <p>Cena za m²: {(nieruchomosci.fields.price / nieruchomosci.fields.area).toFixed(2)} zł</p>
            <Image 
                  src={"https:" + nieruchomosci.fields.gallery.fields.file.url}
                  height={400}
                  width={600}
                  alt="img"
                  priority={true}
                />
                <p>{nieruchomosci.fields.description}</p>
        </div>
    )
}

export default PropertyDetails;