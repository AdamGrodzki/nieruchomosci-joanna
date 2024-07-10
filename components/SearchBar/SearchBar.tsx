import styles from "./searchbar.module.scss";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from "next/router";
import { client } from '@/lib/contentful';

const SearchBar = () => {
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [address, setAddress] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const router = useRouter();

  const suggestionsRef = useRef<HTMLUListElement>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (typeOfProperty) params.append('typeOfProperty', typeOfProperty);
    if (address) params.append('address', address);
    if (transactionType) params.append('transactionType', transactionType);
    if (price) params.append('price', price);
    if (area) params.append('area', area);

    router.push(`searchResults/?${params.toString()}`);
  }

  const fetchAddressSuggestions = useCallback(async (address: string) => {
    if (address.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    const query: any = {
      content_type: "nieruchomosc",
      'fields.address[match]': address,
    };

    try {
      const { items } = await client.getEntries(query);
      const suggestions = items.map(item => item.fields.address);
      setAddressSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  }, []);


  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    fetchAddressSuggestions(newAddress);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setAddress(suggestion);
    setAddressSuggestions([]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
      setAddressSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <div className={styles.container}>
      <h2> <IoSearchCircleOutline />Znajdź swoją wymarzoną nieruchomość</h2>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <select className={styles.option} value={typeOfProperty} onChange={(e) => setTypeOfProperty(e.target.value)}>
          <option value="">Rodzaj nieruchomości</option>
          <option value="Mieszkanie">Mieszkania</option>
          <option value="Dom">Domy</option>
          <option value="Działka">Działki</option>
          <option value="Lokal">Lokale</option>
          <option value="Obiekt">Obiekty</option>
        </select>  
        
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="">Typ transakcji</option>
          <option value="Sprzedaż">Sprzedaż</option>
          <option value="Wynajem">Wynajem</option>
        </select>
        
        <input 
          type="text" 
          inputMode="numeric"
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Cena" 
        /> 

        <input
          type="text" 
          inputMode="numeric"
          value={area} 
          onChange={(e) => setArea(e.target.value)} 
          placeholder="Powierzchnia" 
        />

        <input 
          type="text" 
          value={address} 
          onChange={handleAddressChange} 
          placeholder="Lokalizacja"
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)} 
        />
        {showTooltip && address.length < 3 && (
          <span className={styles.tooltip}>Minimum 3 znaki</span>
        )}
        {addressSuggestions.length > 0 && (
          <ul className={styles.suggestions} ref={suggestionsRef}>
            {addressSuggestions.map((suggestion, index) => (
              <li 
                key={index} 
                onClick={() => handleSuggestionClick(suggestion)} 
                className={styles.suggestionItem}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        
        <button type="submit">Szukaj</button>
      </form>
    </div>
  );
};

export default SearchBar;
