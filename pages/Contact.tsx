import { useState } from 'react';
import styles from '../styles/contact.module.css';
import Footer from '@/components/Footer/Footer';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <>
    <div className={styles.container}>
      <h1>Kontakt</h1>
      <form onSubmit={()=> undefined}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Message:
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}
