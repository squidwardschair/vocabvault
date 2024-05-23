import styles from "../styles/write.module.css";

export default function ProgressArea({ total, remaining, correct, incorrect }) {
  console.log(incorrect);
  return (
    <div className={styles.progressArea}>
      <div className={styles.progressHolder}>
        <div className={styles.progressBarArea}>
          <progress
            className={`${styles.progressBar} ${styles.remBar}`}
            value={remaining}
            max={total}
          ></progress>
          <span className={styles.barText}>Remaining</span>
          <span className={`${styles.barText} ${styles.barTextRight}`}>
            {remaining}
          </span>
        </div>
        <div className={styles.progressBarArea}>
          <progress
            className={`${styles.progressBar} ${styles.corBar}`}
            value={correct}
            max={total}
          ></progress>
          <span className={styles.barText}>Correct</span>
          <span className={`${styles.barText} ${styles.barTextRight}`}>
            {correct}
          </span>
        </div>
        <div className={styles.progressBarArea}>
          <progress
            className={`${styles.progressBar} ${styles.incBar}`}
            value={incorrect}
            max={total}
          ></progress>
          <span className={styles.barText}>Incorrect</span>
          <span className={`${styles.barText} ${styles.barTextRight}`}>
            {incorrect}
          </span>
        </div>
      </div>
    </div>
  );
}
