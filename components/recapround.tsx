import styles from "../styles/write.module.css";
import RecapHolder from "./recapholder";
import { Card } from "../types/index"

type roundProps = {
  cards: Card[];
  round: number;
};

const RecapRound = ({ cards, round }: roundProps) => {
  console.log(cards);
  return (
    <>
      <div className={styles.termHeader}>
        <span
          className={`${styles.termText} ${styles.bold}`}
        >{`Round ${round}`}</span>
        <span className={styles.skip}>Continue from this round</span>
      </div>
      <div className={styles.recapHolder}>
        {cards.map((card, index) => (
          <RecapHolder
            question={card.question}
            answer={card.answer}
            correct={card.correct}
            userAnswer={card.userAnswer}
          ></RecapHolder>
        ))}
      </div>
    </>
  );
};

export default RecapRound;
