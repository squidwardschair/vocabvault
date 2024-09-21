import styles from "../styles/write.module.css";
import AccentBox from "./accents";

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
  setInput(text: string): void;
};

export type WriteRefs = {
  inputRef: RefObject<HTMLDivElement> | null;
  answerButtonRef: RefObject<HTMLButtonElement> | null;
  answerButtonTextRef: RefObject<HTMLSpanElement> | null;
};

const accents: {[key: string]: string} = {
  "a": "á",
  "A": "Á",
  "e": "é",
  "E": "É",
  "i": "í",
  "I": "Í",
  "n": "ñ" ,
  "N": "Ñ",
  "o": "ó",
  "O": "Ó",

}

const WritePage = forwardRef<WriteRefs, Props>((props, ref) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const answerButtonRef = useRef<HTMLButtonElement>(null);
  const answerButtonTextRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => ({
    inputRef: inputRef,
    answerButtonRef: answerButtonRef,
    answerButtonTextRef: answerButtonTextRef,
  }));
  const pressed = () => {
    if (!inputRef?.current?.innerHTML) {
      return
    }
    const flippedAccents = Object.entries(accents).reduce((acc: {[key: string]: string}, [key, value]) => (acc[value] = key, acc), {})
    let newAccent = accents[inputRef?.current?.innerHTML.slice(-1)]
    if (!newAccent) {
      newAccent = flippedAccents[inputRef?.current?.innerHTML.slice(-1)]
    }
    inputRef.current.innerHTML = inputRef.current.innerHTML.slice(0, -1) + newAccent
    props.setInput(inputRef?.current?.innerHTML.slice(0, -1) + newAccent)
    inputRef.current.focus();
    window.getSelection()?.selectAllChildren(inputRef.current)
    window.getSelection()?.collapseToEnd()
  }
  useEffect(() => {
    inputRef?.current?.focus();
    inputRef?.current?.addEventListener("paste", function (e) {
      e.preventDefault();
      const text = e?.clipboardData?.getData("text/plain");
      const range = document?.getSelection()?.getRangeAt(0);
      if (range && text) {
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.selectNodeContents(textNode);
        range.collapse(false);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      if (inputRef.current?.innerHTML) {
        props.setInput(
          inputRef.current.innerHTML.replace(
            /(<br ?\/?>)|(&nbsp;)|(^[ \t]+)|(\s+$)/g,
            ""
          )
        );
      }
    });
  }, []);
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
      <AccentBox letter={inputRef?.current?.innerHTML.slice(-1)} pressed={() => pressed()}/>
    </div>
  );
});

export default WritePage;
