import { client } from '@/lib/contentful';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from "@/styles/searchResult.module.css"

export enum ASD {
  Dom = "Dom",
  Mieszkanie = "Mieszkanie",
  Price = ""
}

const SearchResults = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    location: '',
    transactionType: '',
    price: "",
    area: '',
  });

const getItems = async() => {
 const { items } = await client.getEntries({
    content_type: "nieruchomosc",
    // "fields.typeOfProperty": ASD.Dom || ASD.Mieszkanie,
    "fields.price": ASD.Price,
})
console.log("items",items);

}
useEffect(() => {
getItems()
},[searchParams])

  useEffect(() => {
    if (router.isReady) {
      const { propertyType, location, transactionType, price, area} = router.query;
      setSearchParams({
        propertyType: propertyType as string || '',
        location: location as string || '',
        transactionType: transactionType as string || '',
        price: price as string || "",
        area: area as string || ''
      });
    }
  }, [router.isReady, router.query]);

  console.log("searchParams", searchParams);
  

  return (
    <div>
      <h1>Wyniki wyszukiwania</h1>
      <div className={styles.propertyList}>
      <p>Rodzaj nieruchomości: {searchParams.propertyType || 'Nie określono'}</p>
      <p>Lokalizacja: {searchParams.location || 'Nie określono'}</p>
      <p>Typ transakcji: {searchParams.transactionType || 'Nie określono'}</p>
      <p>Cena: {searchParams.price || 'Nie określono'}</p>
      <p>Powierzchnia: {searchParams.area || 'Nie określono'}</p>
    </div>
    </div>
  );
};

export default SearchResults;
