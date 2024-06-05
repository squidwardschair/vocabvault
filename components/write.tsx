import WritePage, { WriteRefs } from "./writepage";
import WriteResult from "./writeresult";
import ProgressArea from "./progressarea";
import {
  useState,
  useRef,
  useEffect,
  LegacyRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import styles from "../styles/write.module.css";

type Card = {
  question: string;
  answer: string;
  correct: boolean | null;
};
type WriteProps = {
  cardData: Card[];
};

type DisplayProps = {
  onWrite: boolean | null;
  question: string;
  onAnswer(): void;
  answer: string;
  useranswer: string;
  onSkip(): void;
  onOverride(): void;
  onContinue(): void;
  onChange: FormEventHandler;
  text: string;
  handleEnter: KeyboardEventHandler;
  setIncPage(correct: boolean): void;
  refs: LegacyRef<WriteRefs>;
  onIncorrect: boolean;
};

const DisplayWrite = ({
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
  setIncPage,
  onIncorrect,
  refs,
}: DisplayProps) => {
  if (onWrite === null) {
    return <div>blah</div>;
  }
  if (onWrite) {
    return (
      <WritePage
        ref={refs}
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
        setIncPage={(correct) => setIncPage(correct)}
        onIncorrect={onIncorrect}
      />
    );
  }
};
const Write = ({ cardData }: WriteProps) => {
  const [activeCards, setActiveCards] = useState<Card[]>(cardData);
  const [currentCard, changeCard] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [correct, checkCorrect] = useState<boolean | null>(true);
  const [remaining, setRemaining] = useState<number>(activeCards.length);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [onIncorrect, setIncPage] = useState<boolean>(false);
  const [answerAnimation, triggerAnimation] = useState<boolean>(false);
  const [curCards, addCurCard] = useState([]);
  const [incCards, addIncCard] = useState([]);
  const [roundCards, addRoundCard] = useState([]);
  const writePageRefs = useRef<WriteRefs>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (answerAnimation && correct != null) {
      console.log("yeah");
      timeoutRef.current = setTimeout(() => {
        console.log("aaaa");
        writePageRefs?.current?.answerButtonRef?.current?.classList.remove(
          styles.animation
        );
        writePageRefs!.current!.answerButtonTextRef!.current!.innerHTML =
          "Answer";
        triggerAnimation(false);
      }, 500);
      return () => {
        clearTimeout(timeoutRef.current as NodeJS.Timeout);
      };
    }
  }, [answerAnimation]);

  const changeInput = (e: React.KeyboardEvent<HTMLElement>) => {
    setInput(e.currentTarget.innerHTML);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onAnswer();
    }
  };

  const answerState = (correct: boolean) => {
    if (correct) {
      activeCards[currentCard].correct = true;
      checkCorrect(true);
      setNumCorrect((a) => a + 1);
    } else {
      activeCards[currentCard].correct = false;
      checkCorrect(true);
    }
    setRemaining((a) => a - 1);
  };

  const onSkip = () => {
    checkCorrect(false);
    setIncPage(true);
  };

  const onAnswer = () => {
    if (
      input.toLowerCase().replace(/(<br ?\/?>)|(&nbsp;)/g, "") ==
      activeCards[currentCard].answer
        .toLowerCase()
        .replace(/(<br ?\/?>)|(^[ \t]+)|(\s+$)/g, "")
    ) {
      writePageRefs?.current?.answerButtonRef?.current?.classList.add(
        styles.animation
      );
      writePageRefs!.current!.answerButtonTextRef!.current!.innerHTML =
        "Correct!";
      triggerAnimation(true);
      answerState(true);
      const nextIndex = currentCard + 1;
      if (nextIndex >= activeCards.length) {
        checkCorrect(null);
      } else {
        setInput("");
        writePageRefs!.current!.inputRef!.current!.innerHTML = "";
        changeCard(nextIndex);
      }
    } else {
      console.log("blue");
      checkCorrect(false);
    }
  };

  const onContinue = () => {
    setIncPage(false);
    answerState(false);
    const nextIndex = currentCard + 1;
    if (nextIndex >= activeCards.length) {
      checkCorrect(null);
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  const onOverride = () => {
    setIncPage(false);
    answerState(true);
    const nextIndex = currentCard + 1;
    if (nextIndex >= activeCards.length) {
      checkCorrect(null);
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.writeHolder}>
        <ProgressArea
          total={activeCards.length}
          remaining={remaining}
          correct={numCorrect}
          incorrect={activeCards.length - remaining - numCorrect}
        />
        <DisplayWrite
          onWrite={correct}
          question={activeCards[currentCard].question}
          onAnswer={onAnswer}
          answer={activeCards[currentCard].answer}
          useranswer={input.replace(/<br ?\/?>/g, "\n")}
          onSkip={onSkip}
          onOverride={onOverride}
          onContinue={onContinue}
          onChange={changeInput}
          text={input}
          handleEnter={handleEnter}
          setIncPage={setIncPage}
          onIncorrect={onIncorrect}
          refs={writePageRefs}
        />
      </div>
    </div>
  );
};

export default Write;
