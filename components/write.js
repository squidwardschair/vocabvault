import WritePage from "./writepage.js";
import WriteResult from "./writeresult.js";
import ProgressArea from "./progressarea.js";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/write.module.css";

function DisplayWrite({
  onWrite,
  question,
  onAnswer,
  answer,
  useranswer,
  onSkip,
  onOverride,
  onContinue,
  onChange,
  text,
  handleEnter,
  inputRef,
  resultEnter,
  answerButtonRef,
  answerButtonTextRef,
}) {
  if (onWrite === null) {
    return <div>u done!!!</div>;
  }
  if (onWrite) {
    return (
      <WritePage
        term={question}
        onAnswer={() => onAnswer()}
        onSkip={() => onSkip()}
        onChange={(e) => onChange(e)}
        text={text}
        handleEnter={(e) => handleEnter(e)}
        inputRef={inputRef}
        answerButtonRef={answerButtonRef}
        answerButtonTextRef={answerButtonTextRef}
      />
    );
  } else {
    return (
      <WriteResult
        term={question}
        answer={answer}
        useranswer={useranswer}
        onOverride={() => onOverride()}
        onContinue={() => onContinue()}
        resultEnter={resultEnter}
      />
    );
  }
}
export default function Write({ cardData }) {
  const [currentCard, changeCard] = useState(0);
  const [input, setInput] = useState("");
  const [correct, checkCorrect] = useState(true);
  const [remaining, setRemaining] = useState(cardData.length);
  const [numCorrect, setNumCorrect] = useState(0);
  const [onIncorrect, setIncPage] = useState(false);
  const inputRef = useRef();
  const answerButtonRef=useRef()
  const answerButtonTextRef=useRef()

  function changeInput(e) {
    setInput(e.currentTarget.innerHTML);
  }

  function handleEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onAnswer();
    }
  }

  function handleResultEnter(e) {
    if (e.key === "Enter" && onIncorrect) {
      console.log(correct);
      e.preventDefault();
      onContinue();
    }
    if (!onIncorrect) {
      setIncPage(true);
    }
  }
  const onSkip = () => {
    checkCorrect(false);
    setIncPage(true);
  };

  const onAnswer = () => {
    if (input.toLowerCase() == cardData[currentCard].answer.toLowerCase()) {
      checkCorrect(true);
      setNumCorrect((a) => a + 1);
      setRemaining((a) => a - 1);
      const nextIndex = currentCard + 1;
      if (nextIndex >= cardData.length) {
        checkCorrect(null);
      } else {
        setInput("");
        inputRef.current.innerHTML = "";
        changeCard(nextIndex);
      }
    } else {
      console.log("blue");
      checkCorrect(false);
    }
  };

  const onContinue = () => {
    checkCorrect(true);
    setIncPage(false);
    setRemaining((a) => a - 1);
    const nextIndex = currentCard + 1;
    if (nextIndex >= cardData.length) {
      checkCorrect(null);
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  const onOverride = () => {
    checkCorrect(true);
    setIncPage(false);
    setNumCorrect((a) => a + 1);
    setRemaining((a) => a - 1);
    const nextIndex = currentCard + 1;
    if (nextIndex >= cardData.length) {
      checkCorrect(null);
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  return (
    <div className={styles.fullPage} tabIndex={0}>
      <div className={styles.writeHolder}>
        <ProgressArea
          total={cardData.length}
          remaining={remaining}
          correct={numCorrect}
          incorrect={cardData.length - remaining - numCorrect}
        />
        <DisplayWrite
          onWrite={correct}
          question={cardData[currentCard].question}
          onAnswer={onAnswer}
          answer={cardData[currentCard].answer}
          useranswer={input.replace(/<br ?\/?>/g, "\n")}
          onSkip={onSkip}
          onOverride={onOverride}
          onContinue={onContinue}
          onChange={changeInput}
          text={input}
          handleEnter={handleEnter}
          inputRef={inputRef}
          resultEnter={handleResultEnter}
          answerButtonRef={answerButtonRef}
          answerButtonTextRef={answerButtonTextRef}
        />
      </div>
    </div>
  );
}
