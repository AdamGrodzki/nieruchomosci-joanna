import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { offerFormValidationSchema} from '@/static/contactFormSchema';
import emailjs from 'emailjs-com';
import Modal from '@/components/Modal/Modal';
import styles from '@/styles/zglosOferte.module.scss';

const SubmitOfferForm = () => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
      images: [],
    },
    validationSchema: offerFormValidationSchema,
    onSubmit: async (values) => {
      console.log("Submitted:", values)
      try {
        const imageUrls = Array.from(values.images).map((file) => URL.createObjectURL(file));

        const templateParams = {
          ...values,
          images: imageUrls.join(', '),
        };
        console.log("Template,", templateParams);

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
          setImagePreviews([]);
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
    <div style={{ position: 'relative' }}>
    <input
      placeholder='Imię i Nazwisko'
      className={styles.input}
      type="text"
      name="name"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {touched.name && errors.name && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.name}
      </div>
    )}
    </div>
  </div>

<div className={styles.formGroup}>
  <div style={{ position: 'relative' }}>
  <input
    placeholder='Adres email'
    className={styles.input}
    type="email"
    name="email"
    value={values.email}
    onChange={handleChange}
    onBlur={handleBlur}
  />
 {touched.email && errors.email && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.email}
      </div>
    )}
    </div>
</div>

<div className={styles.formGroup}>
  <div style={{ position: 'relative' }}>
  <input
    placeholder='Telefon kontaktowy'
    className={styles.input}
    type="text"
    name="phone"
    value={values.phone}
    onChange={handleChange}
    onBlur={handleBlur}
  />
 {touched.phone && errors.phone && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.phone}
      </div>
    )}
    </div>
</div>

<div className={styles.formGroup}>
  <input
    placeholder='Lokalizacja'
    className={styles.input}
    type="text"
    name="location"
    value={values.location}
    onChange={handleChange}
    required
  />
</div>

 <div className={styles.formGroup}>
  <input
    placeholder='Liczba pokoi'
    className={styles.input}
    type="number"
    name="numberOfRooms"
    value={formik.values.numberOfRooms}
    onChange={formik.handleChange}
    required
  />
</div>

<div className={styles.formGroup}>
  <textarea
    placeholder='Opis...'
    className={styles.textarea}
    name="description"
    value={values.description}
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
    value={values.propertyType}
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
    value={values.transactionType}
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
    value={values.price}
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
    value={values.area}
    onChange={handleChange}
    required
  />
</div>


<h3>Zdjęcia</h3>
<div className={styles.formGroup}>
  <input
    className={styles.fileInput}
    type="file"
    name='images'
    multiple
    accept="image/*"
    onChange={(event) => {
      if (event.currentTarget.files) {
        formik.setFieldValue('images', Array.from(event.currentTarget.files));
      }
    }}
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