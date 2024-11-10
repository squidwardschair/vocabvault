import styles from "../styles/App.module.css";
import { MouseEventHandler } from "react";

type Props = {
  question: string;
  answer: string;
  active: boolean;
  side: boolean;
  onClick: MouseEventHandler;
};

const Flashcard = ({ question, answer, active, side, onClick }: Props) => {
  return (
    <div className={active ? styles.activeCard : styles.inactiveCard}>
      <div
        className={
          side ? styles.flashcard : `${styles.flashcard} ${styles.flipCard}`
        }
        onClick={onClick}
      >
        <div className={styles.cardBody}>
        <span className={styles.cardText}>
            {question}
          </span>
        </div>
        <div className={`${styles.cardBody} ${styles.cardFlipBody}`}>
          <span className={styles.cardText}>
            {answer}

          </span>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
