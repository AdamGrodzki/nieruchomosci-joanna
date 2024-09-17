import { useState, useEffect} from 'react';
import { client } from "@/lib/contentful";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import Skeleton from "@/components/Skeleton/Skeleton";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PropertyDetailsProps } from '@/static/data';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/slug.module.css";

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: "nieruchomosc"
    });

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    });

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { items } = await client.getEntries({
        content_type: "nieruchomosc",
        "fields.slug": params.slug,
    });

    if (!items.length) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            },
        };
    }

    return {
        props: { nieruchomosci: items[0] },
        revalidate: 1
    };
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ nieruchomosci }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (nieruchomosci) {
            setLoading(false);
        }
    }, [nieruchomosci]);

    if (loading) return <Loader />;
    if (!nieruchomosci) return <Skeleton />;

    const { fields } = nieruchomosci;
    const { photos = [] } = fields;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
            minimumFractionDigits: 2,
        }).format(price);
    };

    const settingsPhotos = {
        customPaging: function(i: number) {
            return (
                    <a>
                        <Image
                        className={styles.imageGallery}
                        src={"https:" + photos[i].fields.file.url}
                        alt={photos[i].fields.title}
                        objectFit="cover"
                        width={75}
                        height={60}
                        priority
                        />
                    </a>
            );
        },
        dots: true,
        arrows: false,
        dotsClass: `slick-dots ${styles.customGallery}`,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const formattedPrice = formatPrice(fields.price);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>Nieruchomość na {fields.transactionType}</h2>
                <p>{fields.address}</p>
            </div>
            <h3 className={styles.cardTitle}>{fields.title}</h3>
            <p className={styles.price}>{formattedPrice}</p>

            <div className={styles.cardDetails}>
                <p>Typ budynku: <b>{fields.typeOfProperty}</b></p>
                <p>Powierzchnia: <b>{fields.area} m²</b></p>
                <p>Cena za m²: <b>{formatPrice(fields.price / fields.area)}</b></p>
            </div>

            <div className={styles.cardImage}>
                <Slider {...settingsPhotos}>
                    {photos.map((photo, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <Image
                                src={"https:" + photo.fields.file.url}
                                height={400}
                                width={600}
                                alt={photo.fields.title}
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <p className={styles.description}>{documentToReactComponents(fields.description)}</p>
            <p className={styles.contact}>Kontakt: <a href={`tel:${fields.contact}`}>{fields.contact}</a></p>
        </div>
    );
}

export default PropertyDetails;
