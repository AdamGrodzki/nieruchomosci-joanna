import Image, { StaticImageData } from 'next/image';
import styles from "../../components/TeamMember/TeamMember.module.scss";
import { TeamMemberProps } from '@/static/data';


const TeamMember: React.FC<TeamMemberProps> = ({ name, title, description, email, phone, image, license }) => {
  return (
    <div className={styles.teamMember}>
      <div className={styles.imageWrapper}>
        <Image 
            src={image} 
            alt={`${name} portret`}
            width={300} 
            height={325} 
            priority
        />
      </div>
      <div className={styles.info}>
        <h2>{name}</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          <a href={`mailto:${email}`} aria-label={`Wyślij e-mail do ${name}`}>{email}</a>
        </p>
        <p>
          <a href={`tel:${phone}`} aria-label={`Zadzwoń do ${name}`}>{phone}</a>
        </p>
        <p className={styles.license}>Licencja Zawodowa: <b>{license}</b></p>
      </div>
    </div>
  );
};

export default TeamMember;