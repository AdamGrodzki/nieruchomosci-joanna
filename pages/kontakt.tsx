import React, { useState } from 'react';
import Image from 'next/image';
import { FaMobileAlt } from 'react-icons/fa';
import styles from "@/styles/contact.module.css";
import img1 from "../images/JoannaAvatar.jpg";


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
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

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
