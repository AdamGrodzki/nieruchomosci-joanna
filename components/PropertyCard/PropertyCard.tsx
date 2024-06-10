import Link from "next/link";
import Image from "next/image";
import { Nieruchomosc, PropertyCardProps } from "@/static/data";
import styles from "@/components/PropertyCard/propertyCard.module.scss"


const PropertyCard: React.FC<PropertyCardProps> = ({nieruchomosc}) => {

const {
    title,
    address,
    description,
    gallery,
    price,
    numberOfRooms,
    typeOfProperty,
    contact,
    slug,
  } = nieruchomosc.fields;

    return (
        <div className={styles.card}>
            <div className={styles.featured}>
              <Image 
                src={"https:" + gallery.fields.file.url}
                height={400}
                width={600}
                alt={gallery.fields.title}
              />
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h4>{title}</h4>
                    <p>Price: {price} zl</p>
                </div>
                <div className={styles.actions}>
                    <Link legacyBehavior href={"/property/" + slug}><a>Show details</a></Link>
                </div>
            </div>
        </div>
     );
}
 
export default PropertyCard;