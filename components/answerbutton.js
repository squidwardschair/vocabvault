import { useEffect } from "react";
import styles from "../styles/write.module.css";

export default function AnswerButton({
  onAnswer,
  answerButtonRef,
  answerButtonTextRef,
}) {
  answerButtonRef.current.classList.add("animation");
  answerButtonTextRef.current.innerHTML = "Correct!";
  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      answerButtonRef.current.classList.remove("animation");
      answerButtonTextRef.current.innerHTML = "Answer";
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <button
      className={styles.answerButton}
      onClick={onAnswer}
      ref={answerButtonRef}
    >
      <span className={styles.buttonText} ref={answerButtonTextRef}>
        Answer
      </span>
    </button>
  );
}
