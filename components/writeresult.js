import styles from "../styles/write.module.css";
import ProgressArea from "./progressarea.js";

export default function WriteResult({ cardData }) {
  return (
    <div className={styles.fullPage}>
      <ProgressArea progressData={[]} />
      <div className={styles.writingArea}>
        <div className={styles.termHeader}>
          <span className={styles.termText}>Blahblahblah</span>
        </div>
        <div className={styles.answerArea}>
          <span className={`${styles.incAnswer} ${styles.answerBox}`}>
            U suck
          </span>
        </div>
        <span class={styles.answerDetail}>Your answer</span>
        <div className={styles.answerArea}>
          <span className={`${styles.corAnswer} ${styles.answerBox}`}>
            I suck
          </span>
        </div>
        <span class={styles.answerDetail}>Correct answer</span>
        <div className={styles.continueButtonBox}>
          <button className={styles.continueButton}>
            <span className={styles.buttonText}>Continue</span>
          </button>
          <button className={styles.overrideButton}>
            <span className={styles.buttonText}>Override: I was correct</span>
          </button>
        </div>
      </div>
    </div>
  );
}
