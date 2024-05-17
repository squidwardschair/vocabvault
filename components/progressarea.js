import styles from "../styles/write.module.css";

export default function ProgressArea({ progressData }) {
  return (
    <div className={styles.progressArea}>
      <div className={styles.progressHolder}>
        <div className={styles.progressBarArea}>
          <progress
            className={`${styles.progressBar} ${styles.remBar}`}
            value={30}
            max={50}
          ></progress>
          <span className={styles.barText}>Remaining</span>
          <span className={`${styles.barText} ${styles.barTextRight}`}>50</span>
        </div>
        <div className={styles.progressBarArea}>
          <progress
            className={`${styles.progressBar} ${styles.corBar}`}
            value={5}
            max={50}
          ></progress>
          <span className={styles.barText}>Correct</span>
          <span className={`${styles.barText} ${styles.barTextRight}`}>0</span>
        </div>
        <div className={styles.progressBarArea}>
          <progress
            className={`${styles.progressBar} ${styles.incBar}`}
            value={8}
            max={50}
          ></progress>
          <span className={styles.barText}>Incorrect</span>
          <span className={`${styles.barText} ${styles.barTextRight}`}>0</span>
        </div>
      </div>
    </div>
  );
}
