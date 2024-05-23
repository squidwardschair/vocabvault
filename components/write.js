import WritePage from "./writepage.js";
import WriteResult from "./writeresult.js";
import ProgressArea from "./progressarea.js";
import { useState } from "react";
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

  function changeInput(e) {
    setInput(e.target.value);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      onAnswer();
    }
  }
  const onSkip = () => {
    checkCorrect(false);
  };

  const onAnswer = () => {
    if (input == cardData[currentCard].answer) {
      checkCorrect(true);
      setNumCorrect((a) => a + 1);
      setRemaining((a) => a - 1);
      const nextIndex = currentCard + 1;
      if (nextIndex >= cardData.length) {
        checkCorrect(null);
      } else {
        setInput("");
        changeCard(nextIndex);
      }
    } else {
      checkCorrect(false);
    }
  };

  const onContinue = () => {
    checkCorrect(true);
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
  console.log(remaining);
  console.log(numCorrect);
  console.log(cardData.length - remaining - numCorrect);

  return (
    <div className={styles.fullPage}>
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
          useranswer={input}
          onSkip={onSkip}
          onOverride={onOverride}
          onContinue={onContinue}
          onChange={changeInput}
          text={input}
          handleEnter={handleEnter}
        />
      </div>
    </div>
  );
}
