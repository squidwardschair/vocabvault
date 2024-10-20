import styles from "../styles/write.module.css";
import { ClientCard, questionProps } from "../types/index";
import Link from "next/link";
import { usePathname } from 'next/navigation'

type setData = {
  name: string;
  desc: string | null;
  cardData: ClientCard[];
};

const HomeCards = ({ card }: { card: ClientCard}) => {
    return (
        <div className={styles.homeCard}>
            <div className={styles.homeCardTermHolder}>
            <span className={styles.homeCardTermLabel}>Term</span>
            <span className={styles.homeCardTerm}>
                {card.question}
            </span>
            </div>

            <div className={styles.homeCardTermHolder}>
            <span className={styles.homeCardTermLabel}>Definition</span>
            <span className={styles.homeCardTerm}>
                {card.answer}
            </span>
            </div>
        </div>
    )
}
const SetHome = ({ name, desc, cardData }: setData) => {
  const pathname = usePathname()
  return (
    <div className={styles.setHome}>
      <div className={styles.homeHeader}>
        <span className={styles.titleText}>{name}</span>
        <span className={styles.descText}>{desc}</span>
      </div>
      <div className={styles.homeButtons}>
          <Link className={styles.homeButtonText} href={`${pathname}/flashcards`}>Flashcards</Link>
          <Link className={styles.homeButtonText} href={`${pathname}/write`}>Write</Link>
          <Link className={styles.homeButtonText} href={`${pathname}/learn`}>Learn</Link>
      </div>
      <div className={styles.homeCardHolder}>
        {cardData.map((c, index) => (<HomeCards card={c}></HomeCards>))}
      </div>
    </div>
  );
};
export default SetHome;
