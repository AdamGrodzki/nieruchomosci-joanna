import styles from "./searchbar.module.scss";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState } from 'react';
import { useRouter } from "next/router";

const SearchBar = () => {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(propertyType, location, transactionType);
    
    
    const params = new URLSearchParams();
    if (propertyType) params.append('propertyType', propertyType);
    if (location) params.append('location', location);
    if (transactionType) params.append('transactionType', transactionType);
    if (price) params.append('price', price);
    if (area) params.append('area', area);

    router.push(`searchResults/?${params.toString()}`);
  }

  return (
      <div className={styles.container}>
          <h2> <IoSearchCircleOutline />Znajdź swoją wymarzoną nieruchomość</h2>
        <form className={styles.searchBar} onSubmit={handleSubmit}>
        <select className={styles.option} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} >
            <option value="">Rodzaj nieruchomości</option>
            <option value="Mieszkanie">Mieszkania</option>
            <option value="Dom">Domy</option>
            <option value="plots">Działki</option>
            <option value="locals">Lokale</option>
            <option value="objects">Obiekty</option>
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
        placeholder="Price" 
      /> 

        <input 
        
        type="text" 
        inputMode="numeric"
        value={area} 
        onChange={(e) => setArea(e.target.value)} 
        placeholder="area" 
      /> 

        <input 
        
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Lokalizacja" 
      /> 
 
      <button type="submit">Szukaj</button>
    </form>
    </div>
  );
};

export default SearchBar;