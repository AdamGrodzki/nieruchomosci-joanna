import { client } from '@/lib/contentful';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "@/styles/searchResult.module.css";
import Image from 'next/image';

// export enum PropertyType {
//   Dom = "Dom",
//   Mieszkanie = "Mieszkanie",
//   Price = ""
// }

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

  const getItems = async () => {
    setLoading(true);
    setResults([]);

    const query: any = {
      content_type: "nieruchomosc"
    };

    if (searchParams.typeOfProperty) {
      query['fields.typeOfProperty'] = searchParams.typeOfProperty;
    }

    if (searchParams.address) {
      query['fields.address[match]'] = searchParams.address;
    }

    if (searchParams.transactionType) {
      query['fields.transactionType'] = searchParams.transactionType;
    }

    if (searchParams.price) {
      query['fields.price'] = parseFloat(searchParams.price);
    }

    if (searchParams.area) {
      query['fields.area'] = searchParams.area;
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
  };

  useEffect(() => {
    getItems();
  }, [searchParams]);

  useEffect(() => {
    if (router.isReady) {
      const { typeOfProperty, address, transactionType, price, area } = router.query;
      setSearchParams({
        typeOfProperty: (typeOfProperty as string) || '',
        address: (address as string) || '',
        transactionType: (transactionType as string) || '',
        price: (price as string) || '',
        area: (area as string) || ''
      });
    }
  }, [router.isReady, router.query]);

  console.log("searchParams", searchParams);

  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>Wyniki wyszukiwania</h1>
    </div>
    <div className={styles.resultsContainer}>
    {loading ? (
          <p className={styles.loading}>Ładowanie...</p>
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
              height={200}
              width={300}
              priority={true}
              style={{ objectFit: 'cover', borderRadius: '10px'}}
            />
          </div>
        ))
      ) : (
        <p className={styles.noResults}>Brak wyników wyszukiwania.</p>
      )
      )}
    </div>
  </>
  );
};

export default SearchResults;
