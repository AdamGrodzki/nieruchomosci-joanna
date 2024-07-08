import { PropertyCardProps } from "@/static/data";
import Image from "next/image";
import styles from "@/styles/slug.module.css"
import Skeleton from "@/components/Skeleton/Skeleton"
import { client } from "@/lib/contentful";

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: "nieruchomosc"
    })


    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }: any) {
    const { items } = await client.getEntries({
        content_type: "nieruchomosc",
        "fields.slug": params.slug,
    })

    console.log("items", items);
    

    if (!items.length) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: { nieruchomosci: items[0] },
        revalidate: 1
    }
}


const PropertyDetails:  React.FC<PropertyCardProps> = ({ nieruchomosci}: any) =>{
    if(!nieruchomosci ) return <Skeleton />

    console.log(nieruchomosci); 
    return (
        <>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
            <h2>Nieruchomość na {nieruchomosci.fields.tranactionType}</h2>
            <p>{nieruchomosci.fields.address}</p>
        </div>
            <h3 className={styles.cardTitle}>{nieruchomosci.fields.title}</h3>
            <p className={styles.price}>{nieruchomosci.fields.price.toFixed(2)} zł</p>

        <div className={styles.cardDetails}>
            <p>Typ budynku: <b>{nieruchomosci.fields.typeOfProperty}</b></p>
            <p>Powierzchnia: <b>{nieruchomosci.fields.area} m²</b></p>
            <p>Cena za m²: <b>{(nieruchomosci.fields.price / nieruchomosci.fields.area).toFixed(2)} zł</b></p>
        </div>
        <div className={styles.cardImage}>
            <Image
                  src={"https:" + nieruchomosci.fields.gallery.fields.file.url}
                  height={400}
                  width={600}
                  alt="img"
                  priority={true}
                />
        </div>
                <p className={styles.description}>{nieruchomosci.fields.description}</p>

        </div>
        </>
    )
}

export default PropertyDetails;
