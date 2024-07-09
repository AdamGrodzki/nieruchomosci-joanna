import styles from "./searchbar.module.scss";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useState } from 'react';
import { useRouter } from "next/router";

const SearchBar = () => {
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [address, setAddress] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(typeOfProperty, address, transactionType);
    
    
    const params = new URLSearchParams();
    if (typeOfProperty) params.append('typeOfProperty', typeOfProperty);
    if (address) params.append('address', address);
    if (transactionType) params.append('transactionType', transactionType);
    if (price) params.append('price', price);
    if (area) params.append('area', area);

    router.push(`searchResults/?${params.toString()}`);
  }

  return (
      <div className={styles.container}>
          <h2> <IoSearchCircleOutline />Znajdź swoją wymarzoną nieruchomość</h2>
        <form className={styles.searchBar} onSubmit={handleSubmit}>
        <select className={styles.option} value={typeOfProperty} onChange={(e) => setTypeOfProperty(e.target.value)} >
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
    value={address} 
    onChange={(e) => setAddress(e.target.value)} 
    placeholder="Lokalizacja"
    onFocus={() => setShowTooltip(true)}
    onBlur={() => setShowTooltip(false)} 
  />
 {showTooltip && address.length < 3 && (
    <span className="tooltip">Minimum 3 znaki</span>
  )}
      <button type="submit">Szukaj</button>
    </form>
    </div>
  );
};

export default SearchBar;