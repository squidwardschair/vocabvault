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
  questionLanguage: string;
};

export type WriteRefs = {
  inputRef: RefObject<HTMLDivElement> | null;
  answerButtonRef: RefObject<HTMLButtonElement> | null;
  answerButtonTextRef: RefObject<HTMLSpanElement> | null;
};

const spanishAccents: {[key: string]: string} = {
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
const frenchAccents: { [key: string]: string } = {
  a: "à",
  A: "À",
  î: "i",
  Î: "I",
  ï: "i",
  Ï: "I",
  o: "ô",
  O: "Ô",
  c: "ç",
  C: "Ç",
  é: "e",
  è: "e",
  ê: "e",
  ë: "e",
  É: "E",
  È: "E",
  Ê: "E",
  Ë: "E",
  Ù: "U",
  Ü: "U",
  Û: "U",
  ù: "u",
  ü: "u",
  û: "u",
};

const germanAccents: { [key: string]: string } = {
  "a": "ä",
  "A": "Ä",
  "o": "ö",
  "O": "Ö",
  "u": "ü",
  "U": "Ü",
  "s": "ß"
};

const lowerEs = ["é", "è", "ê", "ë"];
const capitalEs = ["É", "È", "Ê", "Ë"];
const capitalUs = ["Ù", "Ü", "Û"];
const lowerUs = ["ù", "ü", "û"];
const lowerIs = ["î", "ï"]
const capitalIs = ["Ï", "Î"]

const WritePage = forwardRef<WriteRefs, Props>((props, ref) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const answerButtonRef = useRef<HTMLButtonElement>(null);
  const answerButtonTextRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => ({
    inputRef: inputRef,
    answerButtonRef: answerButtonRef,
    answerButtonTextRef: answerButtonTextRef,
  }));

  const frenchEpressed = (accentNum : number) => {
    if (!inputRef?.current?.innerHTML) {
      return
    }
    let letter = inputRef?.current?.innerHTML.slice(-1).toLowerCase()
    let capital = (inputRef?.current?.innerHTML.slice(-1)=="E" || inputRef?.current?.innerHTML.slice(-1)=="U" || inputRef?.current?.innerHTML.slice(-1)=="I") ? true : false
    let newAccent
    if (letter=="e") {
      newAccent = capital ? capitalEs[accentNum] : lowerEs [accentNum]
    } else if (letter=="u") {
      newAccent = capital ? capitalUs[accentNum] : lowerUs [accentNum]
    } else {
      newAccent = capital ? capitalIs[accentNum] : lowerIs [accentNum]
    }
    inputRef.current.innerHTML = inputRef.current.innerHTML.slice(0, -1) + newAccent
    props.setInput(inputRef?.current?.innerHTML.slice(0, -1) + newAccent)
    inputRef.current.focus();
    window.getSelection()?.selectAllChildren(inputRef.current)
    window.getSelection()?.collapseToEnd()
  }

  const pressed = () => {
    if (!inputRef?.current?.innerHTML) {
      return
    }
    let accents
    if (props.questionLanguage=="ES") {
      accents = spanishAccents
    } else if (props.questionLanguage=="FR") {
      accents=frenchAccents
    } else if (props.questionLanguage=="GE") {
      accents=germanAccents
    }
    if (accents) {
      if (lowerEs.includes(inputRef?.current?.innerHTML.slice(-1).toLowerCase()) || lowerUs.includes(inputRef?.current?.innerHTML.slice(-1).toLowerCase()) || lowerIs.includes(inputRef?.current?.innerHTML.slice(-1).toLowerCase())) {
        let newAccent = accents[inputRef?.current?.innerHTML.slice(-1)]
        inputRef.current.innerHTML = inputRef.current.innerHTML.slice(0, -1) + newAccent
        props.setInput(inputRef?.current?.innerHTML.slice(0, -1) + newAccent)
      } else {
        const flippedAccents = Object.entries(accents).reduce((acc: {[key: string]: string}, [key, value]) => (acc[value] = key, acc), {})
        let newAccent = accents[inputRef?.current?.innerHTML.slice(-1)]
        if (!newAccent) {
          newAccent = flippedAccents[inputRef?.current?.innerHTML.slice(-1)]
        }
        inputRef.current.innerHTML = inputRef.current.innerHTML.slice(0, -1) + newAccent
        props.setInput(inputRef?.current?.innerHTML.slice(0, -1) + newAccent)
      }
    }

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
          spellCheck={false}
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
      <AccentBox letter={inputRef?.current?.innerHTML.slice(-1)} pressed={() => pressed()} frenchEPressed={frenchEpressed} language={props.questionLanguage}/>
    </div>
  );
});

export default WritePage;
