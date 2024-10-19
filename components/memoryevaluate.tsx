import styles from "../styles/write.module.css";
import { useEffect } from "react";

type Props = {
  term: string;
  answer: string;
  useranswer: string;
  onContinue(status: number): void;
};
const MemoryEvaluate = ({
  term,
  answer,
  useranswer,
  onContinue,
}: Props) => {
  return (
    <div className={styles.writingArea}>
      <div className={styles.termHeader}>
        <span className={styles.termText}>{answer}</span>
      </div>
      <span className={styles.subheaderText}>Evaluate your answer</span>
      <div className={styles.answerArea}>
        <span className={`${styles.memAnswer} ${styles.answerBox}`}>
          {useranswer}
        </span>
      </div>
      <span className={styles.answerDetail}>Your answer</span>
      <div className={styles.answerArea}>
        <span className={`${styles.corAnswer} ${styles.answerBox}`}>
          {term}
        </span>
      </div>
      <span className={styles.answerDetail}>Correct answer</span>
      <div className={styles.memButtonBox}>
        <button className={`${styles.memButton} ${styles.memButtonGreen}`} onClick={() => onContinue(2)}>
          <span className={styles.buttonText}>I got it completely correct</span>
        </button>
        <button className={`${styles.memButton} ${styles.memButtonYellow}`} onClick={() => onContinue(1)}>
          <span className={styles.buttonText}>I got it partially correct</span>
        </button>
        <button className={`${styles.memButton} ${styles.memButtonRed}`} onClick={() => onContinue(0)}>
          <span className={styles.buttonText}>I got it completely wrong</span>
        </button>
      </div>
    </div>
  );
};

export default MemoryEvaluate;
