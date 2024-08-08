import React, { useState } from 'react';
import Image from 'next/image';
import { FaMobileAlt } from 'react-icons/fa';
import { MdOutlineMail, MdOutlineLocationOn } from 'react-icons/md';
import styles from "@/styles/contact.module.css"
import avatarJoanna from '@/images/JoannaAvatar.jpg';
import avatarSebastian from '@/images/SebastianAvatar.png';

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
       <h1 className={styles.heading}>Kontakt</h1>
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <h2>Dane kontaktowe</h2>
        
        <div className={styles.agentInfo}>
          <Image 
            className={styles.agentImage}
            src={avatarJoanna}
            alt="Joanna"
            width={150}
            height={150}
            priority={true}
          />
          <div>
            <h3>Joanna Nieruchomości</h3>
            <p><FaMobileAlt /><a href="tel: 123 456 789"> 123 456 789</a></p>
            <p><MdOutlineMail /><a href="mailto:joanna@estateapp.com"> joanna@estateapp.com</a></p>
          </div>
        </div>

        <div className={styles.agentInfo}>
          <Image 
            className={styles.agentImage}
            src={avatarSebastian}
            alt="Sebastian"
            width={150}
            height={150}
            priority={true}

          />
          <div>
            <h3>Sebastian Nieruchomości</h3>
            <p><FaMobileAlt /><a href="tel: 987 654 321"> 987 654 321</a></p>
            <p><MdOutlineMail /><a href="mailto:sebastian@estateapp.com"> sebastian@estateapp.com</a></p>
          </div>
        </div>

        {/* <div className={styles.officeInfo}>
          <h3>Biuro</h3>
          <p><MdOutlineLocationOn />Pomorska 1, 83-110 Tczew</p>
          <h4>Godziny otwarcia biura:</h4>
          <p>Poniedziałek-Piątek: 9.00-17.00</p>
          <p>Weekendy: ustalane telefonicznie</p>
        </div> */}
      </div>

      <div className={styles.contactForm}>
        <h2>Formularz kontaktowy</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Imię i Nazwisko"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-mail"
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
          <textarea 
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Wiadomość"
            required
          />
          <button type="submit">Wyślij</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;
