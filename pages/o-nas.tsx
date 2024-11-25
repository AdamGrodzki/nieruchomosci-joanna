import TeamMember from "@/components/TeamMember/TeamMember";
import joannaAvatar from "../images/JoannaAvatar.jpg"
import sebastianAvatar from "../images/SebastianAvatar.png"
import styles from "@/styles/aboutUs.module.scss"
import { TeamMemberProps } from "@/static/data";

const teamMembers: TeamMemberProps[] = [
    {
      name: 'Joanna Kowalska',
      title: 'Właściciel, pośrednik w obrocie nieruchomościami, obsługa nieruchomości, marketing, sprzedaż, dialog z klientem',
      description: 'Ludzkość w połączeniu z profesjonalizmem to podstawa sukcesu. Zgodnie z tą dewizą do każdej sprzedaży nieruchomości podchodzimy bardzo indywidualnie i z sercem. Dokładamy wszelkich starań, aby sprzedaż Twojej nieruchomości była wspaniałym doświadczeniem.',
      email: 'joanna@estateapp.com',
      phone: '123 456 789',
      image: joannaAvatar,
      license: '21605'
    },
    {
      name: 'Sebastian Kowalski',
      title: 'Właściciel, pośrednik w obrocie nieruchomościami, obsługa nieruchomości, marketing, sprzedaż, dialog z klientem',
      description: 'Z doświadczenia wiem jak ważny jest stały kontakt z właścicielem i zainteresowanymi stronami. Cieszę się, że jestem łącznikiem między nimi i dbam o to, aby każdy miał pod ręką wszystkie istotne informacje, aby osiągnąć możliwie najlepszy wynik dla obu stron',
      email: 'sebastian@estateapp.com',
      phone: '987 654 321',
      image: sebastianAvatar,
      license: '10101'
    },
  ];
  
const teamMember: React.FC = () => {  
  return (
    <div className={styles.container}>
        <div className={styles.content}>
          <h1>O nas</h1>
          <p>Witamy na stronie naszego zespołu. Tutaj możesz dowiedzieć się więcej o naszych oddanych profesjonalistach.</p>
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
