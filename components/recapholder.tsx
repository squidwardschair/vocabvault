import styles from "../styles/write.module.css";
import { ClientCard } from "../types/index"

const CorrectIcon = ({ correct }: { correct: boolean | null }) => {
  if (correct) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#90ee90"
        className={styles.resultIcon}
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#f08080"
        className={styles.resultIcon}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    );
  }
};
const RecapHolder = ({ question, answer, correct, userAnswer }: ClientCard) => {
  return (
    <div className={styles.recapAnswers}>
      <div className={styles.recapTerm}>
        <span className={styles.overallText}>{question}</span>
      </div>
      <div className={styles.recapAnswer}>
        <CorrectIcon correct={correct}></CorrectIcon>
        <span className={correct ? styles.correctText : styles.incorrectText}>
          {userAnswer}
        </span>
      </div>
    </div>
  );
};

export default RecapHolder;
