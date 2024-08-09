import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { PropertyCardProps } from "@/static/data";
import styles from "@/components/PropertyCard/propertyCard.module.scss"
import { FaLocationDot } from "react-icons/fa6";


const PropertyCard: React.FC<PropertyCardProps> = ({nieruchomosc}) => {
const {
    title,
    address,
    gallery,
    price,
    numberOfRooms,
    slug,
    area,
  } = nieruchomosc.fields;

    return (
        <div className={styles.card}>
            <div className={styles.featured}>
              <Link href={`/oferta/${slug}`} prefetch={true} legacyBehavior>
              <a>
                <Image 
                  src={"https:" + gallery.fields.file.url}
                  height={400}
                  width={600}
                  alt={gallery.fields.title}
                  priority={true}
                />
                 </a>
              </Link>
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <h4>{title}</h4>
                    <p><FaLocationDot /> {address}</p>
                    <div className={styles.price}>
                      {new Intl.NumberFormat('pl-PL', 
                      { 
                        style: 'currency',
                        currency: 'PLN',  
                      }).format(price)}</div>
                    <div>
                      <p >Powierzchnia: <b>{area} m<sup>2</sup></b></p>
                      <p>
                        Liczba pokoi: <b>{numberOfRooms > 0 ? numberOfRooms : '❌'}</b>
                      </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PropertyCard;
