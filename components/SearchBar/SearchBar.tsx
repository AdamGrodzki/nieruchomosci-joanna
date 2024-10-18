import { useState, useCallback, useRef, useEffect } from 'react';
import { client } from '@/lib/contentful';
import { useRouter } from 'next/router';
import { IoSearchCircleOutline } from 'react-icons/io5';
import styles from './searchbar.module.scss';
import { useFormik } from 'formik';
import { SearchBarSchema } from '@/static/contactFormSchema';
import cx from 'clsx'; 

const SearchBar = () => {
  const router = useRouter();
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      typeOfProperty: '',
      transactionType: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      address: '',
    },
    validationSchema: SearchBarSchema,
    onSubmit: (values) => {
      const params = new URLSearchParams(values);
      router.push(`searchResults/?${params.toString()}`);
    },
  });

  const fetchAddressSuggestions = useCallback(async (address: string) => {
    if (address.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    const query = {
      content_type: 'nieruchomosc',
      'fields.address[match]': address,
    };

    try {
      const { items } = await client.getEntries(query);
      const suggestions = items.map(item => item.fields.address as string);
      setAddressSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    if (suggestionsRef.current && !suggestionsRef.current.contains(target)) {
      setAddressSuggestions([]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('pointerdown', handleClickOutside);
    
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <IoSearchCircleOutline />
        Znajdź swoją wymarzoną nieruchomość
      </h2>
      <form className={styles.searchBar} onSubmit={formik.handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="typeOfProperty">Rodzaj nieruchomości</label>
            <select 
              id="typeOfProperty"
              {...formik.getFieldProps('typeOfProperty')}
              className={cx({ [styles.error]: formik.touched.typeOfProperty && formik.errors.typeOfProperty })}
            >
              <option value="">Wybierz rodzaj</option>
              <option value="Mieszkanie">Mieszkania</option>
              <option value="Dom">Domy</option>
              <option value="Działka">Działki</option>
              <option value="Lokal">Lokale</option>
              <option value="Obiekt">Obiekty</option>
            </select>
            {formik.touched.typeOfProperty && formik.errors.typeOfProperty && <div className={styles.error}>{formik.errors.typeOfProperty}</div>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="transactionType">Typ transakcji</label>
            <select 
              id="transactionType"
              {...formik.getFieldProps('transactionType')}
              className={cx({ [styles.error]: formik.touched.transactionType && formik.errors.transactionType })}
            >
              <option value="">Wybierz typ</option>
              <option value="Sprzedaż">Sprzedaż</option>
              <option value="Wynajem">Wynajem</option>
            </select>
            {formik.touched.transactionType && formik.errors.transactionType && <div className={styles.error}>{formik.errors.transactionType}</div>}
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
                placeholder="Od"
                {...formik.getFieldProps('minPrice')}
                className={cx({ [styles.error]: formik.touched.minPrice && formik.errors.minPrice })}
              />
              <input 
                id="maxPrice"
                type="text"
                inputMode="numeric"
                placeholder="Do"
                {...formik.getFieldProps('maxPrice')}
                className={cx({ [styles.error]: formik.touched.maxPrice && formik.errors.maxPrice })}
              />
            </div>
            {formik.touched.minPrice && formik.errors.minPrice && <div className={styles.errorText}>{formik.errors.minPrice}</div>}
            {formik.touched.maxPrice && formik.errors.maxPrice && <div className={styles.errorText}>{formik.errors.maxPrice}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="minArea">Powierzchnia</label>
            <div className={styles.inputGroup}>
              <input
                id="minArea"
                type="text"
                inputMode="numeric"
                placeholder="Od"
                {...formik.getFieldProps('minArea')}
                className={cx({ [styles.error]: formik.touched.minArea && formik.errors.minArea })}
              />
              <input
                id="maxArea"
                type="text"
                inputMode="numeric"
                placeholder="Do"
                {...formik.getFieldProps('maxArea')}
                className={cx({ [styles.error]: formik.touched.maxArea && formik.errors.maxArea })}
              />
            </div>
            {formik.touched.minArea && formik.errors.minArea && <span className={styles.errorText}>{formik.errors.minArea}</span>}
            {formik.touched.maxArea && formik.errors.maxArea && <span className={styles.errorText}>{formik.errors.maxArea}</span>}
          </div>
        </div>

        <div className={styles.formGroupLocation}>
          <label htmlFor="address">Lokalizacja</label>
          <div className={styles.addressInputWrapper}>
            <input 
               id="address"
               type="text"
               placeholder="Wpisz lokalizację"
               {...formik.getFieldProps('address')}
               onChange={(e) => {
                 formik.handleChange(e);
                 fetchAddressSuggestions(e.target.value);
               }}
               className={cx({ [styles.error]: formik.touched.address && formik.errors.address })}
            />
         
            {addressSuggestions.length > 0 && (
              <ul className={styles.suggestions} ref={suggestionsRef}>
                {addressSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    onClick={() => {
                      formik.setFieldValue('address', suggestion);
                      setAddressSuggestions([]);
                    }}
                    className={styles.suggestionItem}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <button type="submit" className={styles.searchButton}>Szukaj</button>
          </div>
          {formik.touched.address && formik.errors.address && <div className={styles.errorTextAddress}>{formik.errors.address}</div>}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
