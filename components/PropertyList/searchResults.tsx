import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SearchResults = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    propertyType: '',
    location: '',
    transactionType: ''
  });

  useEffect(() => {
    if (router.isReady) {
      const { propertyType, location, transactionType } = router.query;
      setSearchParams({
        propertyType: propertyType as string || '',
        location: location as string || '',
        transactionType: transactionType as string || ''
      });
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <h1>Wyniki wyszukiwania</h1>
      <p>Rodzaj nieruchomości: {searchParams.propertyType || 'Nie określono'}</p>
      <p>Lokalizacja: {searchParams.location || 'Nie określono'}</p>
      <p>Typ transakcji: {searchParams.transactionType || 'Nie określono'}</p>
    </div>
  );
};

export default SearchResults;