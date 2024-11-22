import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMobileAlt } from 'react-icons/fa';
import { useFormik } from 'formik';
import styles from '@/styles/contact.module.scss';
import logoDark from '../images/logoDark.png';
import emailjs from 'emailjs-com';
import Modal from '@/components/Modal/Modal';

import {ContactFormSchema} from '@/static/contactFormSchema'


const Contact = () => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: ContactFormSchema, 
    onSubmit: (values, { resetForm }) => {
      const serviceID = String(process.env.SERVICE_ID);
      const templateID = String(process.env.TEMPLATE_ID);
      const userID = String(process.env.USER_ID);

      const templateParams = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
      };

      emailjs
        .send(serviceID, templateID, templateParams, userID)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setAlertMessage('Wiadomość została wysłana pomyślnie!');
          setAlertType('success');
          resetForm(); 
        })
        .catch((err) => {
          console.error('Error', err);
          setAlertMessage('Błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
          setAlertType('error');
        });
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
    setAlertMessage('');
    setAlertType(null);
  };

  //CLEAR COMPONENT 404 AFTER 2SEC. 
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertType(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1>Kontakt</h1>
        <p>Jeśli masz pytania lub chcesz lepiej poznać naszą ofertę – zadzwoń lub napisz. Możesz też umówić się na spotkanie z nami przy przepysznej kawie.</p>
        <p>
          <FaMobileAlt />
          <a href="tel:123 456 789"> 123 456 789</a>
        </p>
      </div>

      {alertMessage && (
        <Modal
          message={alertMessage}
          onClose={handleCloseModal}
          color={alertType === 'success' ? '#155724' : '#721c24'}
          background={alertType === 'success' ? '#c3e6cb' : '#f5c6cb'}
        />
      )}

      <div className={styles.contactContent}>
<form onSubmit={handleSubmit} className={styles.contactForm}>
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      name="name"
      placeholder="Imię i Nazwisko"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {touched.name && errors.name && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.name}
      </div>
    )}
  </div>

  <div style={{ position: 'relative' }}>
    <input
      type="tel"
      name="phone"
      placeholder="Telefon kontaktowy"
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

  <div style={{ position: 'relative' }}>
    <input
      type="email"
      name="email"
      placeholder="Adres Email"
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

  <div style={{ position: 'relative' }}>
    <textarea
      name="message"
      placeholder="Treść wiadomości..."
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {touched.message && errors.message && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {errors.message}
      </div>
    )}
  </div>

  <button type="submit">Wyślij</button>
</form>


        <div className={styles.contactImage}>
          <Image
            src={logoDark}
            alt="Kontakt"
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;

