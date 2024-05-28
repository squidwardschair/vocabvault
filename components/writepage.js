import styles from "../styles/write.module.css";

export default function WritePage({
  term,
  onAnswer,
  onSkip,
  onChange,
  text,
  handleEnter,
  inputRef,
  answerButtonRef,
  answerButtonTextRef,
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
          ref={inputRef}
        ></div>
        <div className={styles.answerButtonBox}>
          <button
            className={styles.answerButton}
            onClick={onAnswer}
            ref={answerButtonRef}
          >
            <span className={styles.buttonText} ref={answerButtonTextRef}>
              Answer
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
