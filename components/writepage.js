import styles from "../styles/write.module.css";

export default function WritePage({
  term,
  onAnswer,
  onSkip,
  onChange,
  text,
  handleEnter,
}) {
  return (
    <div className={styles.writingArea}>
      <div className={styles.termHeader}>
        <span className={styles.termText}>{term}</span>
        <span className={styles.skip} onClick={onSkip}>
          Skip
        </span>
      </div>
      <div className={styles.answerArea}>
        <div
          className={styles.answerInput}
          onInput={onChange}
          value={text}
          onKeyDown={handleEnter}
          contentEditable={true}
          placeholder="Type your answer here..."
        ></div>
        <div className={styles.answerButtonBox}>
          <button className={styles.answerButton} onClick={onAnswer}>
            <span className={styles.buttonText}>Answer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
