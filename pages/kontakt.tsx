import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMobileAlt } from 'react-icons/fa';
import styles from "@/styles/contact.module.css";
import img1 from "../images/logoDark.png";
import emailjs from 'emailjs-com';
import Modal from "@/components/Modal/Modal";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form)
    e.preventDefault();
  
    const serviceID = String(process.env.SERVICE_ID);
    const templateID = String(process.env.TEMPLATE_ID);
    const userID = String(process.env.USER_DI);

    const templateParams: Record<string, unknown> = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };
  
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setAlertMessage('Wiadomość została wysłana pomyślnie!');
        setAlertType('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      })
      .catch((err) => {
        console.error('Error', err);
        setAlertMessage('Błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
        setAlertType('error');
      });
  };

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
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Imię i Nazwisko"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefon kontaktowy"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Adres Email"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Treść wiadomości"
            required
          />
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


