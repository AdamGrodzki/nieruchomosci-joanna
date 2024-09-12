import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMobileAlt } from 'react-icons/fa';
import { useFormik } from 'formik';
import styles from '@/styles/contact.module.css';
import img1 from '../images/logoDark.png';
import emailjs from 'emailjs-com';
import Modal from '@/components/Modal/Modal';

import {ContactFormSchema} from '@/static/contactFormSchema'

const Contact = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
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
      const userID = String(process.env.USER_DI);



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

  const handleCloseModal = () => {
    setAlertMessage(null);
    setAlertType(null);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
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
        {/* <form onSubmit={formik.handleSubmit} className={styles.contactForm}>
          <input
            type="text"
            name="name"
            placeholder="Imię i Nazwisko"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <div className={styles.error}>{formik.errors.name}</div>}

          <input
            type="tel"
            name="phone"
            placeholder="Telefon kontaktowy"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && <div className={styles.error}>{formik.errors.phone}</div>}

          <input
            type="email"
            name="email"
            placeholder="Adres Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}

          <textarea
            name="message"
            placeholder="Treść wiadomości"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.message && formik.errors.message && <div className={styles.error}>{formik.errors.message}</div>}

          <button type="submit">Wyślij</button>
        </form> */}

<form onSubmit={formik.handleSubmit} className={styles.contactForm}>
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      name="name"
      placeholder="Imię i Nazwisko"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.name && formik.errors.name && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {formik.errors.name}
      </div>
    )}
  </div>

  <div style={{ position: 'relative' }}>
    <input
      type="tel"
      name="phone"
      placeholder="Telefon kontaktowy"
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.phone && formik.errors.phone && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {formik.errors.phone}
      </div>
    )}
  </div>

  <div style={{ position: 'relative' }}>
    <input
      type="email"
      name="email"
      placeholder="Adres Email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.email && formik.errors.email && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {formik.errors.email}
      </div>
    )}
  </div>

  <div style={{ position: 'relative' }}>
    <textarea
      name="message"
      placeholder="Treść wiadomości"
      value={formik.values.message}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.message && formik.errors.message && (
      <div className={`${styles.error} ${styles.errorVisible}`}>
        {formik.errors.message}
      </div>
    )}
  </div>

  <button type="submit">Wyślij</button>
</form>


        <div className={styles.contactImage}>
          <Image
            src={img1}
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

