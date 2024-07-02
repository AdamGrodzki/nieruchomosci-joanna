import { useState } from 'react';
import styles from '../styles/contact.module.css';
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";

export default function Contact() {
  const [showMap, setShowMap] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  const handleMapButtonClick = () => {
    setShowMap(!showMap); 
  };

  return (
    <div className={styles.container}>
  <div className={styles.leftColumn}>
    
    <div className={styles.contactInfo}>
    <h2>Dane kontaktowe</h2>
      <h3>Joanna Nieruchomości</h3>
      <p><MdOutlineLocationOn />Pomorska 1, 83-110 Tczew</p>
      <p><FaMobileAlt /><a href="tel: 123 456 789"> 123 456 789</a></p>
      <p><FaMobileAlt /><a href="tel: 987 654 321"> 987 654 321</a></p>
      <p><MdOutlineMail /><a href="mailto:joanna@estateapp.com"> joanna@estateapp.com</a></p>
      <p><MdOutlineMail /><a href="mailto:sebastian@estateapp.com"> sebastian@estateapp.com</a></p>
      
      <h3>Godziny otwarcia biura:</h3>
      <p>Poniedziałek-Piątek: 9.00-17.00</p>
      <p>Weekendy: ustalane telefonicznie</p>
    </div>

    <div className={styles.mapSection}>
      <h3>Lokalizacja biura</h3>
      <button className={styles.mapButton} onClick={handleMapButtonClick}>
        Zobacz na mapie
      </button>
      {showMap && (
        <iframe 
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.919373067589!2d18.779856784362117!3d54.09574238238076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd6117ec6d7b45%3A0xb5a28d33f5dc9636!2sPepco!5e0!3m2!1spl!2spl!4v1719910367918!5m2!1spl!2spl" 
          width="100%" 
          height="400" 
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      )}
    </div>

    <div className={styles.agentsList}>
      <h3>Lista Agentów</h3>
      <div></div>
    </div>
  </div>

  <div className={styles.rightColumn}>
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Formularz kontaktowy</h2>
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
  );
}