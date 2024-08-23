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

  const createdAt = new Date(nieruchomosc.sys.createdAt);
  const today = new Date();
  const timeDiff = Math.abs(today.getTime() - createdAt.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const isNewOffer = diffDays <= 7;
  
  const formattedDate = new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(createdAt));


    return (
      <div className={styles.card}>
          {isNewOffer && <div className={styles.newOfferBadge}>Nowość!</div>}
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
                      <p>Oferta zostala utworzona: {formattedDate}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PropertyCard;
