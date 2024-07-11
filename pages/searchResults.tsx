import { client } from '@/lib/contentful';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import styles from "@/styles/searchResult.module.css";
import Image from 'next/image';

import { TbLoader2 } from "react-icons/tb";

interface SearchParams {
  typeOfProperty: string;
  address: string;
  transactionType: string;
  price: string;
  area: string;
}

const SearchResults = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    typeOfProperty: '',
    address: '',
    transactionType: '',
    price: '',
    area: '',
  });


  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getItems = useCallback(async () => {
    setLoading(true);
    setResults([]);

    const resetSearchParams = {
      typeOfProperty: '',
      address: '',
      transactionType: '',
      price: '',
      area: '',
    };

    const query: any = {
      content_type: "nieruchomosc"
    };
  
    if (router.query.typeOfProperty) {
      query['fields.typeOfProperty'] = router.query.typeOfProperty;
      resetSearchParams.typeOfProperty = router.query.typeOfProperty as string;
    }
  
    if (router.query.address) {
      query['fields.address[match]'] = router.query.address;
      resetSearchParams.address = router.query.address as string;
    }
  
    if (router.query.transactionType) {
      query['fields.transactionType'] = router.query.transactionType;
      resetSearchParams.transactionType = router.query.transactionType as string;
    }
  
    if (router.query.price) {
      query['fields.price'] = router.query.price;
      resetSearchParams.price = router.query.price as string;
    }
  
    if (router.query.area) {
      query['fields.area'] = router.query.area;
      resetSearchParams.area = router.query.area as string;
    }
  

    try {
      const { items } = await client.getEntries(query);
      console.log("items", items);
      setResults(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, [router.query]);

  useEffect(() => {
    if (router.isReady) {
      getItems();
    }
  }, [router.isReady, getItems]);

  console.log("searchParams", searchParams);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Wyniki wyszukiwania</h1>
      
      <div className={styles.resultsContainer}>
        {loading ? (
          <p className={styles.loading}>Ładowanie...<TbLoader2 className={styles.fiLoader} /></p>
        ) : (
          results.length > 0 ? (
            results.map(result => (
              <div key={result.sys.id} className={styles.resultItem}>
                <h2>{result.fields.title}</h2>
                <p>Typ: {result.fields.typeOfProperty}</p>
                <p>Lokalizacja: {result.fields.address}</p>
                <p>Cena: {result.fields.price} zł</p>
                <p>Powierzchnia: {result.fields.area} m<sup>2</sup></p>
                <p>Typ transakcji: {result.fields.transactionType}</p>
                <Image
                  src={"https:" + result.fields.gallery.fields.file.url}
                  alt="img"
                  height={180}
                  width={300}
                  priority={true}
                  style={{ objectFit: 'cover', borderRadius: '10px' }}
                />
              </div>
            ))
          ) : (
            <p className={styles.noResults}>Brak wyników wyszukiwania.</p>
            
          )
        )}
      </div>
      </div>
    </>
  );
};

export default SearchResults;

