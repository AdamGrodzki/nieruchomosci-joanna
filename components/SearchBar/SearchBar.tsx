import styles from "./searchbar.module.scss";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState } from 'react';





const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Tutaj dodaj kod do obsługi wyszukiwania
    console.log('Wyszukiwanie:', e);
};


const SearchBar = ({}) => {
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [transactionType, setTransactionType] = useState("");

  return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <IoSearchCircleOutline/>
            <h2>Znajdź swoją wymarzoną nieruchomość</h2>
        <select className={styles.option} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
            <option value="">Rodzaj nieruchomosci</option>
            <option value="flats">Mieszkania</option>
            <option value="houses">Domy</option>
            <option value="plots">Działki</option>
            <option value="locals">Lokale</option>
            <option value="objects">Obiekty</option>
        </select>  
        
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}required>
            <option value="">Typ transakcji</option>
            <option value="sale">Sprzedaż</option>
            <option value="rent">Wynajem</option>
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
  );
};

export default SearchBar;