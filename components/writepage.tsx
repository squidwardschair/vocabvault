import styles from "../styles/write.module.css";
import {
  KeyboardEventHandler,
  FormEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  RefObject,
  useEffect,
} from "react";

type Props = {
  term: string;
  onAnswer(): void;
  onSkip(): void;
  onChange: FormEventHandler;
  text: string;
  handleEnter: KeyboardEventHandler;
};

export type WriteRefs = {
  inputRef: RefObject<HTMLDivElement> | null;
  answerButtonRef: RefObject<HTMLButtonElement> | null;
  answerButtonTextRef: RefObject<HTMLSpanElement> | null;
};

const WritePage = forwardRef<WriteRefs, Props>(function Page(props, ref) {
  const inputRef = useRef<HTMLDivElement>(null);
  const answerButtonRef = useRef<HTMLButtonElement>(null);
  const answerButtonTextRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => ({
    inputRef: inputRef,
    answerButtonRef: answerButtonRef,
    answerButtonTextRef: answerButtonTextRef,
  }));

  useEffect(() => {
    inputRef?.current?.focus()

  }, [])
  return (
    <div className={styles.writingArea}>
      <div className={styles.termHeader}>
        <span className={styles.termText}>{props.term}</span>
        <span className={styles.skip} onClick={props.onSkip}>
          Skip
        </span>
      </div>
      <div className={styles.answerArea}>
        <div
          className={styles.answerInput}
          onInput={props.onChange}
          data-value={props.text}
          onKeyDown={props.handleEnter}
          contentEditable={true}
          data-placeholder="Type your answer here..."
          ref={inputRef}
        ></div>
        <div className={styles.answerButtonBox}>
          <button
            className={styles.answerButton}
            onClick={props.onAnswer}
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
});

export default WritePage;
