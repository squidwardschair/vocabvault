import styles from "../styles/write.module.css";
import ProgressArea from "./progressarea.js";

export default function WritePage({ cardData }) {
  return (
    <div className={styles.fullPage}>
      <ProgressArea progressData={[]} />
      <div className={styles.writingArea}>
        <div className={styles.termHeader}>
          <span className={styles.termText}>Blahblahblah</span>
          <span className={styles.skip}>Skip</span>
        </div>
        <div className={styles.answerArea}>
          <input
            className={styles.answerInput}
            placeholder="Type your answer here..."
          />
          <div className={styles.answerButtonBox}>
            <button className={styles.answerButton}>
              <span className={styles.buttonText}>Answer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
