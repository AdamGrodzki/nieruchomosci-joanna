import React from 'react';
import styles from '@/components/PropertyList/propertyList.module.scss';

interface Property {
  id: string;
  type: string;
  location: string;
  transactionType: string;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className={styles.propertyList}>
      <h2>Wyniki wyszukiwania</h2>
      {properties.length === 0 ? (
        <p>Brak wyników wyszukiwania.</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h3>{property.type}</h3>
              <p>Lokalizacja: {property.location}</p>
              <p>Typ transakcji: {property.transactionType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyList;