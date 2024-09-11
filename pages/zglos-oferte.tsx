import { useEffect, useState } from 'react';
import styles from '@/styles/zglosOferte.module.css';
import emailjs from 'emailjs-com';
import Modal from '@/components/Modal/Modal';

const SubmitOfferForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    numberOfRooms: '',
    description: '',
    propertyType: '',
    transactionType: '',
    price: '',
    area: '',
    images: [],
  });

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (e:any) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(formData);
    
    
    try {

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      numberOfRooms: formData.numberOfRooms,
      description: formData.description,
      propertyType: formData.propertyType,
      transactionType: formData.transactionType,
      price: formData.price,
      area: formData.area,
      images: formData.images.length,
    };

    const serviceID = String(process.env.SERVICE_ID);
    const templateOfferID = String(process.env.TEMPLATE_OFFER_ID);
    const userID = String(process.env.USER_DI);


      const response = await emailjs.send(serviceID, templateOfferID, templateParams, userID);

      if (response.status === 200) {
        setModalMessage('Oferta została zgłoszona pomyślnie!');
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          numberOfRooms: '',
          description: '',
          propertyType: '',
          transactionType: '',
          price: '',
          area: '',
          images: [],
        });
      } else {
        setModalMessage('Wystąpił błąd podczas zgłaszania oferty.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Wystąpił błąd podczas zgłaszania oferty.');
      setIsSuccess(false);
    }
  };

  const handleCloseModal = () => {
    setModalMessage(null); 
  };

  useEffect(() => {
    if (modalMessage) {
      const timer = setTimeout(() => {
        setModalMessage(null);
        setIsSuccess(Boolean);
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [modalMessage]);

  return (
    <>
    {modalMessage && (
      <Modal 
        message={modalMessage} 
        onClose={handleCloseModal}
        color={isSuccess ? '#155724' : '#721c24'}
        background={isSuccess ? '#c3e6cb' : '#f5c6cb'}
      />
    )}

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
    </>
  );
};

export default SubmitOfferForm;
