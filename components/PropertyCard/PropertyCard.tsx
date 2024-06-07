import Link from "next/link";

interface Nieruchomosc {
    fields: {
      title: string;
      address: string;
      description: string;
      gallery: string[];
      price: number;
      numberOfRooms: number;
      typeOfProperty: string;
      contact: string;
    };
};
  

  interface PropertyCardProps {
    nieruchomosc: Nieruchomosc;
  }


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
  } = nieruchomosc.fields;

    return ( 
        <div className="card">
            <div className="featured">
                {/* {image} */}
            </div>
            <div className="content">
                <div className="info">
                    <h4>{title}</h4>
                    <p>Price {price.toFixed(2)} zl</p>
                </div>
                <div className="actions">
                    {/* <Link legacyBehavior href={"/property/" + slug}><a>Show details</a></Link> */}
                </div>
            </div>
        </div>
     );
}
 
export default PropertyCard;