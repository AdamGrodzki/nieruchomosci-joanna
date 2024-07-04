import styles from "./searchbar.module.scss";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState } from 'react';

const SearchBar = () => {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [transactionType, setTransactionType] = useState("");

 
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(propertyType, location, transactionType);
}

  return (
      <div className={styles.container}>
          <h2> <IoSearchCircleOutline />Znajdź swoją wymarzoną nieruchomość</h2>
        <form className={styles.searchBar} onSubmit={handleSubmit}>
        <select className={styles.option} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
            <option value="">Rodzaj nieruchomości</option>
            <option value="Mieszkanie">Mieszkania</option>
            <option value="Dom">Domy</option>
            <option value="plots">Działki</option>
            <option value="locals">Lokale</option>
            <option value="objects">Obiekty</option>
        </select>  
        
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}required>
            <option value="">Typ transakcji</option>
            <option value="Sprzedaż">Sprzedaż</option>
            <option value="Wynajem">Wynajem</option>
        </select>

        <input 
        required
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