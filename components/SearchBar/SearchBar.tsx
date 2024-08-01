import styles from "./searchbar.module.scss";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from "next/router";
import { client } from '@/lib/contentful';


const SearchBar = () => {
  const [typeOfProperty, setTypeOfProperty] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minArea, setMinArea] = useState<string>("");
  const [maxArea, setMaxArea] = useState<string>("");

  const suggestionsRef = useRef<HTMLUListElement>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const params = new URLSearchParams();    
    typeOfProperty ? params.append('typeOfProperty', typeOfProperty) : null;
    address ? params.append('address', address) : null;
    transactionType ? params.append('transactionType', transactionType) : null;
    price ? params.append('price', price.toString()) : null;
    area ? params.append('area', area.toString()) : null;
    minPrice ? params.append('minPrice', minPrice.toString()) : null;
    maxPrice ? params.append('maxPrice', maxPrice.toString()) : null;
    minArea ? params.append('minArea', minArea.toString()) : null;
    maxArea ? params.append('maxArea', maxArea.toString()) : null;


    router.push(`searchResults/?${params.toString()}`);
  }


  const fetchAddressSuggestions = useCallback(async (address: string) => {
    if (address.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    const query: {
      content_type: string;
      'fields.address[match]': string;

    }= {
      content_type: "nieruchomosc",
      'fields.address[match]': address,
    }


    try {
      const { items } = await client.getEntries(query);
      const suggestions = items.map(item => item.fields.address as string);
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
  <h2 className={styles.title}>
    <IoSearchCircleOutline />
    Znajdź swoją wymarzoną nieruchomość
  </h2>
  <form className={styles.searchBar} onSubmit={handleSubmit}>
    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label htmlFor="typeOfProperty">Rodzaj nieruchomości</label>
        <select 
          id="typeOfProperty"
          value={typeOfProperty} 
          onChange={(e) => setTypeOfProperty(e.target.value)}
        >
          <option value="">Wybierz rodzaj</option>
          <option value="Mieszkanie">Mieszkania</option>
          <option value="Dom">Domy</option>
          <option value="Działka">Działki</option>
          <option value="Lokal">Lokale</option>
          <option value="Obiekt">Obiekty</option>
        </select>  
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="transactionType">Typ transakcji</label>
        <select 
          id="transactionType"
          value={transactionType} 
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="">Wybierz typ</option>
          <option value="Sprzedaż">Sprzedaż</option>
          <option value="Wynajem">Wynajem</option>
        </select>
      </div>
    </div>
    
    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label htmlFor="minPrice">Cena</label>
        <div className={styles.inputGroup}>
          <input 
            id="minPrice"
            type="text" 
            inputMode="numeric"
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)} 
            placeholder="Od" 
          /> 
          <input 
            id="maxPrice"
            type="text" 
            inputMode="numeric"
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)} 
            placeholder="Do" 
          /> 
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="minArea">Powierzchnia</label>
        <div className={styles.inputGroup}>
          <input
            id="minArea"
            type="text" 
            inputMode="numeric"
            value={minArea} 
            onChange={(e) => setMinArea(e.target.value)} 
            placeholder="Od" 
          />
          <input
            id="maxArea"
            type="text" 
            inputMode="numeric"
            value={maxArea} 
            onChange={(e) => setMaxArea(e.target.value)} 
            placeholder="Do" 
          />
        </div>
      </div>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="address">Lokalizacja</label>
      <div className={styles.addressInputWrapper}>
        <input 
          id="address"
          type="text" 
          value={address} 
          onChange={handleAddressChange} 
          placeholder="Wpisz lokalizację"
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
      </div>
    </div>
    <button type="submit" className={styles.searchButton}>Szukaj</button>
  </form>
</div>

  );
};

export default SearchBar;
