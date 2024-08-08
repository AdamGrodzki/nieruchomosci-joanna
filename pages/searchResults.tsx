import { client } from '@/lib/contentful';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TbLoader2 } from "react-icons/tb";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import styles from "@/styles/searchResult.module.css";

interface SearchParams {
  typeOfProperty: string;
  address: string;
  transactionType: string;
  price: string;
  area: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
}

const SearchResults = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    typeOfProperty: '',
    address: '',
    transactionType: '',
    price: '',
    area: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
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
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
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
  
    if (router.query.minArea) {
      query['fields.area[gte]'] = router.query.minArea;
      resetSearchParams.area = router.query.minArea as string;
    }
    if (router.query.maxArea) {
      query['fields.area[lte]'] = router.query.maxArea;
      resetSearchParams.area = router.query.maxArea as string;
    }
  
    if (router.query.minPrice) {
      query['fields.price[gte]'] = router.query.minPrice;
      resetSearchParams.price = router.query.minPrice as string;
    }
  
    if (router.query.maxPrice) {
      query['fields.price[lte]'] = router.query.maxPrice;
      resetSearchParams.price = router.query.maxPrice as string;
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
    }).format(price);
};


  return (
    <>
      <div className={styles.container}>
    {loading ? (
      <h1 className={styles.title}><TbLoader2 className={styles.fiLoader}/></h1>
    ) : (
      <h1 className={styles.title}>
        Wyniki wyszukiwania: <span>{results.length}</span>
      </h1>
)}
      <div className={styles.resultsContainer}>
        {loading ? (
          <p className={styles.loading}>Ładowanie...<TbLoader2 className={styles.fiLoader} /></p>
        ) : (
          results.length > 0 ? (
            results.map(result => (
              <div key={result.sys.id} className={styles.resultItem}>
                <h2>{result.fields.title}</h2>
                <p>Typ: <b>{result.fields.typeOfProperty}</b></p>
                <p>Lokalizacja: <b>{result.fields.address}</b></p>
                <p>Cena: <b>{formatPrice(result.fields.price)}</b></p>
                <p>Powierzchnia: <b>{result.fields.area}m<sup>2</sup></b></p>
                <p>Typ transakcji: <b>{result.fields.transactionType}</b></p>

                <Image
                  src={"https:" + result.fields.gallery.fields.file.url}
                  alt="img"
                  height={200}
                  width={300}
                  priority={true}
                />
              <Link legacyBehavior href={`/oferta/${result.fields.slug}`}>
              <button className={styles.detailsButton}>Szczegóły <MdKeyboardDoubleArrowRight /></button>
              </Link> 
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
