import TeamMember from "@/components/TeamMember/TeamMember";
import joannaAvatar from "../images/JoannaAvatar.jpg"
import sebastianAvatar from "../images/SebastianAvatar.png"
import heroGraphic from "@/images/desk.jpg";
import Image from "next/image";
import styles from "@/styles/aboutUs.module.scss"
import { TeamMemberProps } from "@/static/data";

const teamMembers: TeamMemberProps[] = [
    {
      name: 'Joanna Kruczek',
      title: 'Właściciel, pośrednik w obrocie nieruchomościami, obsługa nieruchomości, marketing, sprzedaż, dialog z klientem',
      description: 'Ludzkość w połączeniu z profesjonalizmem to podstawa sukcesu. Zgodnie z tą dewizą do każdej sprzedaży nieruchomości podchodzimy bardzo indywidualnie i z sercem. Dokładamy wszelkich starań, aby sprzedaż Twojej nieruchomości była wspaniałym doświadczeniem.',
      email: 'joanna@nieruchomoscijoanna.pl',
      phone: '884 849 400',
      image: joannaAvatar,
      license: '29135'
    },
    {
      name: 'Sebastia Kruczek',
      title: 'Właściciel, pośrednik w obrocie nieruchomościami, obsługa nieruchomości, marketing, sprzedaż, dialog z klientem',
      description: 'Z doświadczenia wiem jak ważny jest stały kontakt z właścicielem i zainteresowanymi stronami. Cieszę się, że jestem łącznikiem między nimi i dbam o to, aby każdy miał pod ręką wszystkie istotne informacje, aby osiągnąć możliwie najlepszy wynik dla obu stron',
      email: 'sebastian@nieruchomoscijoanna.pl',
      phone: '603 372 701',
      image: sebastianAvatar,
      license: '29136'
    },
  ];
  
const teamMember: React.FC = () => {  
  return (
    <div className={styles.container}>
      <div className={styles.heroWrapper}>
        <Image 
          src={heroGraphic} 
          alt='Hero Graphic'
        />
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>O nas</h1>
          <p>Witamy na stronie naszego zespołu. Tutaj możesz dowiedzieć się więcej o naszych oddanych profesjonalistach.</p>
        </div>
      </div>
      </div>
      <div className={styles.cardContainer}>
      {teamMembers.map(member => (
        <TeamMember
          key={member.email}
          name={member.name}
          title={member.title}
          description={member.description}
          email={member.email}
          phone={member.phone}
          image={member.image}
          license={member.license}
        />
      ))}
      </div>
    </div>
  );
  };

export default teamMember;
