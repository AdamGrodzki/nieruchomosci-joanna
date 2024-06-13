import Link from "next/link";
import Image from "next/image";
import { PropertyCardProps } from "@/static/data";
import styles from "@/components/PropertyCard/propertyCard.module.scss"
import { FaLocationDot } from "react-icons/fa6";




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
    area,
  } = nieruchomosc.fields;


    return (
        <div className={styles.card}>
            <div className={styles.featured}>
              <Link href={`/property/ ${slug}`}>
                <Image 
                  src={"https:" + gallery.fields.file.url}
                  height={400}
                  width={600}
                  alt={gallery.fields.title}
                  priority={true}
                />
              </Link>
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h4>{title}</h4>
                    <p><FaLocationDot /> {address}</p>
                    <p className={styles.price}>
                      {new Intl.NumberFormat('pl-PL', 
                      { 
                        style: 'currency',
                        currency: 'PLN',  
                      }).format(price)}</p>
                    <div>
                      <p>powierzchnia: {area} m<sup>2</sup></p>
                      <p>liczba pokoi: {numberOfRooms} </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PropertyCard;