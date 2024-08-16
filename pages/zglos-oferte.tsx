import { useState } from 'react';
import styles from "@/styles/zglosOferte.module.css";

const SubmitOfferForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    propertyType: '',
    transactionType: '',
    price: '',
    area: '',
    location: '',
    numberOfRooms: '',
    images: null,
  });

  const handleChange = (e:any) => {
    const { name, value, type } = e.target;

if (type === 'file') {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submitOffer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Oferta została zgłoszona pomyślnie!');
      } else {
        alert('Wystąpił błąd podczas zgłaszania oferty.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas zgłaszania oferty.');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Zgłoś ofertę</h2>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Imię i nazwisko</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>E-mail</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Telefon kontaktowy</label>
        <input
          className={styles.input}
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Lokalizacja</label>
        <input
          className={styles.input}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Liczba pokoi</label>
        <input
          className={styles.input}
          type="number"
          name="numberOfRooms"
          value={formData.numberOfRooms}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Opis</label>
        <textarea
          className={styles.textarea}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <h3>Dodatkowe informacje</h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>Rodzaj nieruchomości</label>
        <select
          className={styles.select}
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          required
        >
          <option value="">Wybierz</option>
          <option value="mieszkanie">Mieszkanie</option>
          <option value="dom">Dom</option>
          <option value="działka">Działka</option>
          <option value="lokal">Lokal</option>
          <option value="obiekt">Obiekt</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Typ transakcji</label>
        <select
          className={styles.select}
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          required
        >
          <option value="">Wybierz</option>
          <option value="sprzedaż">Sprzedaż</option>
          <option value="wynajem">Wynajem</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Cena (zł)</label>
        <input
          className={styles.input}
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Powierzchnia (m²)</label>
        <input
          className={styles.input}
          type="number"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
        />
      </div>

      <h3>Zdjęcia</h3>
      <div className={styles.formGroup}>
        <input
          className={styles.fileInput}
          type="file"
          multiple
          onChange={handleChange}
        />
        <p className={styles.note}>Uwaga: Możesz przesłać kilka zdjęć jednocześnie!</p>
      </div>

      <button className={styles.submitButton} type="submit">
        Wyślij zgłoszenie
      </button>
    </form>
  );
};

export default SubmitOfferForm;