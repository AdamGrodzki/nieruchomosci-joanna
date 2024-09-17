import React, {useMemo} from 'react';
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

  const createdAt = useMemo(() => new Date(nieruchomosc.sys.createdAt), [nieruchomosc.sys.createdAt]);
  const diffDays = useMemo(() => {
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - createdAt.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }, [createdAt]);

  const isNewOffer = diffDays <= 7;
  
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(createdAt);
  }, [createdAt]);


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
                  alt={gallery.fields.title || "Property Image"}
                  priority={false}
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
