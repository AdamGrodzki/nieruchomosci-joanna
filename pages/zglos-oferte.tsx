import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { offerFormValidationSchema} from '@/static/contactFormSchema';
import emailjs from 'emailjs-com';
import Modal from '@/components/Modal/Modal';
import styles from '@/styles/zglosOferte.module.scss';

import { FaEnvelope } from "react-icons/fa";

const SubmitOfferForm = () => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: offerFormValidationSchema,
    onSubmit: async (values) => {
      console.log("Submitted:", values)
      try {

        const templateParams = {
          ...values,
        };

        const serviceID = String(process.env.SERVICE_ID);
        const templateOfferID = String(process.env.TEMPLATE_OFFER_ID);
        const userID = String(process.env.USER_ID);

        const response = await emailjs.send(
          serviceID,
          templateOfferID,
          templateParams,
          userID
        );

        const message = response.status === 200 
        ? 'Oferta została zgłoszona pomyślnie!'
        : 'Wystąpił błąd podczas zgłaszania oferty.';

        setModalMessage(message)
        setIsSuccess(response.status === 200)
        
        if(response.status === 200) { 
          formik.resetForm();
      }
    } catch(error) {
      console.log('Error', error);
      setModalMessage('Wystąpił błąd podczas zgłaszania oferty.');
      setIsSuccess(false)
    }
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors
  } = formik;

  const handleCloseModal = () => {
    setModalMessage(null);
  };

     useEffect(() => {
        if (modalMessage) {
          const timer = setTimeout(() => {
            setModalMessage(null);
            setIsSuccess(false);
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
      

<form onSubmit={handleSubmit} className={styles.formContainer}>
<h2 className={styles.heading}>Zgłoś ofertę</h2>

<div className={styles.formGroup}>
    <input
      className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
      placeholder=' '
      type="text"
      name="name"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="off" 
    />
  <label className={styles.label}>Imię i nazwisko</label>
    {touched.name && errors.name && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.name}
      </div>
    )}
  </div>

<div className={styles.formGroup}>
  <input
    placeholder=' '
    className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
    type="email"
    name="email"
    value={values.email}
    onChange={handleChange}
    onBlur={handleBlur}
    autoComplete="off" 
  />
  <label className={styles.label}>Adres email</label>
 {touched.email && errors.email && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.email}
      </div>
    )}
</div>

<div className={styles.formGroup}>
  <input
    placeholder=' '
    className={`${styles.input} ${touched.phone && errors.phone ? styles.inputError : ''}`}
    type="text"
    name="phone"
    value={values.phone}
    onChange={handleChange}
    onBlur={handleBlur}
    autoComplete="off" 
  />
  <label className={styles.label}>Telefon kontaktowy</label>
 {touched.phone && errors.phone && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.phone}
      </div>
    )}
</div>

<div className={styles.formGroup}>
  <input
    placeholder=' '
    className={`${styles.input} ${touched.location && errors.location ? styles.inputError : ''}`}
    type="text"
    name="location"
    value={values.location}
    onChange={handleChange}
    onBlur={handleBlur}
    required
    autoComplete="off"
  />
  <label className={styles.label}>Lokalizacja</label>
  {touched.location && errors.location && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.location}
      </div>
    )}
</div>

 <div className={styles.formGroup}>
  <input
    placeholder=' '
    className={`${styles.input} ${touched.numberOfRooms && errors.numberOfRooms ? styles.inputError : ''}`}
    type="number"
    name="numberOfRooms"
    value={values.numberOfRooms}
    onChange={handleChange}
    onBlur={handleBlur}
    required
    autoComplete="off" 
  />
  <label className={styles.label}>Liczba pokoi</label>
  {touched.numberOfRooms && errors.numberOfRooms && (
    <div className={`${styles.error} ${styles.errorVisible}`}>
      {errors.numberOfRooms}
    </div>
  )}
</div>

<div className={styles.formGroup}>
  <textarea
    placeholder='Opis...'
    className={`${styles.textarea} ${touched.description && errors.description ? styles.inputError : ''}`}
    name="description"
    value={values.description}
    onChange={handleChange}
    onBlur={handleBlur}
    required
  ></textarea>
    {touched.description && errors.description && (
    <div className={`${styles.error} ${styles.errorVisible}`}>
      {errors.description}
    </div>
  )}
</div>

<h3>Dodatkowe informacje</h3> 

<div className={styles.formGroup}>
  <select
    className={styles.select}
    name="propertyType"
    value={values.propertyType}
    onChange={handleChange}
    required
  >
    <option value="">Rodzaj nieruchomości</option>
    <option value="mieszkanie">Mieszkanie</option>
    <option value="dom">Dom</option>
    <option value="działka">Działka</option>
    <option value="lokal">Lokal</option>
    <option value="obiekt">Obiekt</option>
  </select>
</div>

<div className={styles.formGroup}>
  <select
    className={styles.select}
    name="transactionType"
    value={values.transactionType}
    onChange={handleChange}
    required
  >
    <option value="">Typ transakcji</option>
    <option value="sprzedaż">Sprzedaż</option>
    <option value="wynajem">Wynajem</option>
  </select>
</div>

<div className={styles.formGroup}>
  <input
    className={`${styles.input} ${touched.price && errors.price ? styles.inputError : ''}`}
    type="number"
    name="price"
    placeholder=' '
    value={values.price}
    onChange={handleChange}
    onBlur={handleBlur}
    required
    autoComplete="off"
  />
  <label className={styles.label}>Cena (zł)</label>
  {touched.price && errors.price && (
    <div className={`${styles.error} ${styles.errorVisible}`}>
      {errors.price}
    </div>
  )}
</div>

<div className={styles.formGroup}>
  <input
    className={`${styles.input} ${touched.area && errors.area ? styles.inputError : ''}`}
    type="number"
    name="area"
    placeholder=' '
    value={values.area}
    onChange={handleChange}
    onBlur={handleBlur}
    required
  />
  <label className={styles.label}>Powierzchnia (m²)</label>
  {touched.area && errors.area && (
    <div className={`${styles.error} ${styles.errorVisible}`}>
      {errors.area}
      </div>
  )}
</div>

<div className={styles.emailContainer}>
    <p>Zdjęcia ofert prosimy wysyłać na:</p>
    <p>
      <a href="mailto:joanna@nieruchomosci.pl">joanna@nieruchomosci.pl</a>
    </p>
    <p>
      <a href="mailto:sebastian@nieruchomosci.pl">sebastian@nieruchomosci.pl</a>
    </p>
</div>

<button className={styles.submitButton} type="submit">
  Wyślij zgłoszenie
</button>
</form>
    </>
  );
};

export default SubmitOfferForm;