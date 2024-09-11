import Image from 'next/image';
import styles from "../../components/TeamMember/TeamMember.module.scss";

const TeamMember = ({ name, title, description, email, phone, image, license }:any) => {
  return (
    <div className={styles.teamMember}>
      <div className={styles.imageWrapper}>
        <Image src={image} alt={name} width={300} height={325} />
      </div>
      <div className={styles.info}>
        <h2>{name}</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <p><a href={`mailto:${email}`}>{email}</a></p>
        <p><a href={`tel:${phone}`}>{phone}</a></p>
        <p className={styles.license}>Licencja Zawodowa: <b>{license}</b></p>
      </div>
    </div>
  );
};

export default TeamMember;