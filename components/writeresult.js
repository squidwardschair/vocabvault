import styles from "../styles/write.module.css";

export default function WriteResult({
  term,
  answer,
  useranswer,
  onOverride,
  onContinue,
}) {
  return (
    <div className={styles.writingArea}>
      <div className={styles.termHeader}>
        <span className={styles.termText}>{term}</span>
      </div>
      <div className={styles.answerArea}>
        <span className={`${styles.incAnswer} ${styles.answerBox}`}>
          {useranswer}
        </span>
      </div>
      <span class={styles.answerDetail}>Your answer</span>
      <div className={styles.answerArea}>
        <span className={`${styles.corAnswer} ${styles.answerBox}`}>
          {answer}
        </span>
      </div>
      <span class={styles.answerDetail}>Correct answer</span>
      <div className={styles.continueButtonBox}>
        <button className={styles.continueButton} onClick={onContinue}>
          <span className={styles.buttonText}>Continue</span>
        </button>
        <button className={styles.overrideButton} onClick={onOverride}>
          <span className={styles.buttonText}>Override: I was correct</span>
        </button>
      </div>
    </div>
  );
}
