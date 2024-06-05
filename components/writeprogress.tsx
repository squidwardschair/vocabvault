import styles from "../styles/write.module.css";
import RecapRound from "./recapround";

type Card = {
  question: string;
  answer: string;
  correct: boolean | null;
};

type progressProps = {
  rounds: Card[][];
  onContinue(): void;
};
const WriteProgress = ({ rounds, onContinue }: progressProps) => {
  console.log(rounds);
  return (
    <div className={styles.writingArea}>
      {rounds.map((round, index) => (
        <RecapRound cards={round} round={index + 1}></RecapRound>
      ))}
      <div className={styles.continueButtonBox}>
        <button className={styles.continueButton} onClick={onContinue}>
          <span className={styles.buttonText}>Continue</span>
        </button>
      </div>
    </div>
  );
};

export default WriteProgress;
