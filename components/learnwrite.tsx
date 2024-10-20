import WritePage, { WriteRefs } from "./writepage";
import WriteResult from "./writeresult";
import {
  useState,
  useRef,
  useEffect,
  LegacyRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import styles from "../styles/write.module.css";
import { ClientCard } from "../types/index";

export type writeProps = {
  cardData: ClientCard[];
  learnStateFunc(status: boolean): void;
  learnCorrectFunc(correct: boolean | null): void;
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
  fullscreenEnter(correct: boolean): void;
  refs: LegacyRef<WriteRefs>;
  enterStatus: boolean | null;
  setInput(text: string): void;
  answerLanguage: string;
  isFinished: boolean;
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
  fullscreenEnter,
  enterStatus,
  setInput,
  answerLanguage,
  refs,
}: DisplayProps) => {
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
        setInput={(text) => setInput(text)}
        answerLanguage={answerLanguage}
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
        fullscreenEnter={(correct) => fullscreenEnter(correct)}
        enterStatus={enterStatus}
      />
    );
  }
};
const LearnWrite = ({
  cardData,
  learnStateFunc,
  learnCorrectFunc,
}: writeProps) => {
  const [activeCards, setActiveCards] = useState<ClientCard[]>(cardData);
  const [currentCard, changeCard] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [correct, checkCorrect] = useState<boolean | null>(true);
  const [remaining, setRemaining] = useState<number>(activeCards.length);
  const [total, setTotal] = useState<number>(activeCards.length);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [enterStatus, fullscreenEnter] = useState<boolean | null>(false);
  const [answerAnimation, triggerAnimation] = useState<boolean>(false);
  const [roundCards, addRoundCard] = useState<ClientCard[][]>([]);
  const [roundPercents, addRoundPercent] = useState<string[]>([]);
  const [finishedState, setFinishedState] = useState<boolean>(false);
  const writePageRefs = useRef<WriteRefs>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (answerAnimation && correct != null) {
      console.log("yeah");
      timeoutRef.current = setTimeout(() => {
        console.log("aaaa");
        writePageRefs?.current?.answerButtonRef?.current?.classList.remove(
          styles.correctAnimation
        );
        writePageRefs!.current!.answerButtonTextRef!.current!.innerHTML =
          "Answer";
        triggerAnimation(false);
        learnCorrectFunc(true)
        learnStateFunc(true);
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
      fullscreenEnter(null);
    }
  };

  const answerState = (correct: boolean) => {
    if (correct) {
      activeCards[currentCard].correct = true;
      checkCorrect(true);
      setNumCorrect((a) => a + 1);
    } else {
      activeCards[currentCard].correct = false;
      learnCorrectFunc(false);
      checkCorrect(true);
    }
    activeCards[currentCard].userAnswer = input.replace(
      /(<br ?\/?>)|(^[ \t]+)|(\s+$)/g,
      ""
    );
    setRemaining((a) => a - 1);
  };

  const onSkip = () => {
    checkCorrect(false);
    fullscreenEnter(true);
  };

  const onFinish = (lastCorrect: boolean) => {
    let curCards = activeCards.map((card) => ({ ...card }));
    let percentDecimal;
    let correct;
    if (lastCorrect) {
      percentDecimal = ((numCorrect + 1) / total) * 100;
      correct = numCorrect + 1;
    } else {
      percentDecimal = (numCorrect / total) * 100;
      correct = numCorrect;
    }
    if (correct === total) {
      setFinishedState(true);
    }
    let percentString = `${correct}/${total} - ${percentDecimal.toFixed(0)}%`;
    addRoundCard([...roundCards, curCards]);
    addRoundPercent([...roundPercents, percentString]);
  };

  const onAnswer = () => {
    if (
      input
        .toLowerCase()
        .replace(/(<br ?\/?>)|(&nbsp;)|(^[ \t]+)|(\s+$)/g, "") ==
      activeCards[currentCard].question
        .toLowerCase()
        .replace(/(<br ?\/?>)|(&nbsp;)|(^[ \t]+)|(\s+$)/g, "")
    ) {
      writePageRefs?.current?.answerButtonRef?.current?.classList.add(
        styles.correctAnimation
      );
      writePageRefs!.current!.answerButtonTextRef!.current!.innerHTML =
        "Correct!";
      triggerAnimation(true);
    } else {
      checkCorrect(false);
      if (enterStatus != null) {
        fullscreenEnter(true);
      }
    }
  };

  const onContinue = () => {
    learnStateFunc(true);
    learnCorrectFunc(false);

    fullscreenEnter(false);
    answerState(false);
    const nextIndex = currentCard + 1;
    if (nextIndex >= activeCards.length) {
      onFinish(false);
      checkCorrect(null);
      if (enterStatus != null) {
        fullscreenEnter(true);
      }
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  const onOverride = () => {
    learnStateFunc(true);
    learnCorrectFunc(true);
    fullscreenEnter(false);
    answerState(true);
    const nextIndex = currentCard + 1;
    if (nextIndex >= activeCards.length) {
      onFinish(true);
      checkCorrect(null);
      fullscreenEnter(true);
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  return (
    <div className={`${styles.learnModeHeight} ${styles.writeHolder}`}>
      <DisplayWrite
        onWrite={correct}
        question={activeCards[currentCard].answer}
        onAnswer={onAnswer}
        answer={activeCards[currentCard].question}
        useranswer={input
          .replace(/<br ?\/?>/g, "\n")
          .replace(/(&nbsp;)|(^[ \t]+)|(\s+$)/g, "")}
        onSkip={onSkip}
        onOverride={onOverride}
        onContinue={onContinue}
        onChange={changeInput}
        text={input}
        handleEnter={handleEnter}
        fullscreenEnter={fullscreenEnter}
        enterStatus={enterStatus}
        isFinished={finishedState}
        setInput={setInput}
        answerLanguage={activeCards[currentCard].answerLanguage}
        refs={writePageRefs}
      />
    </div>
  );
};

export default LearnWrite;
