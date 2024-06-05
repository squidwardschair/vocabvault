import WritePage, { WriteRefs } from "./writepage";
import WriteResult from "./writeresult";
import ProgressArea from "./progressarea";
import WriteProgress from "./writeprogress"
import {
  useState,
  useRef,
  useEffect,
  LegacyRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import styles from "../styles/write.module.css";
import { questionProps, Card} from "../types/index"

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
  onIncorrect: boolean;
  roundCards: Card[][]
  onRoundContinue(): void;
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
  onIncorrect,
  roundCards,
  onRoundContinue,
  refs,
}: DisplayProps) => {
  if (onWrite === null) {
    return <WriteProgress rounds={roundCards} onContinue={() => onRoundContinue()} />;
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
        fullscreenEnter={(correct) => fullscreenEnter(correct)}
        onIncorrect={onIncorrect}
      />
    );
  }
};
const Write = ({ cardData }: questionProps) => {
  const [activeCards, setActiveCards] = useState<Card[]>(cardData);
  const [currentCard, changeCard] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [correct, checkCorrect] = useState<boolean | null>(true);
  const [remaining, setRemaining] = useState<number>(activeCards.length);
  const [total, setTotal] = useState<number>(activeCards.length)
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [onIncorrect, fullscreenEnter] = useState<boolean>(false);
  const [answerAnimation, triggerAnimation] = useState<boolean>(false);
  const [roundCards, addRoundCard] = useState<Card[][]>([]);
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
    activeCards[currentCard].userAnswer=input.replace(/(<br ?\/?>)|(^[ \t]+)|(\s+$)/g, "")
    setRemaining((a) => a - 1);
  };

  const onSkip = () => {
    checkCorrect(false);
    fullscreenEnter(true);
  };

  const onFinish = () => {
    let curCards = activeCards.map(card => ({ ...card }))
    addRoundCard([...roundCards, curCards])
  }

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
        onFinish()
        checkCorrect(null)
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
    fullscreenEnter(false);
    answerState(false);
    const nextIndex = currentCard + 1;
    if (nextIndex >= activeCards.length) {
      onFinish()
      checkCorrect(null);
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  const onOverride = () => {
    fullscreenEnter(false);
    answerState(true);
    const nextIndex = currentCard + 1;
    if (nextIndex >= activeCards.length) {
      onFinish()
      checkCorrect(null);
    } else {
      setInput("");
      changeCard(nextIndex);
    }
  };

  const onRoundContinue = () => {
    // DONT FORGET ADD OVERALL PERCENTAGE PLZ CHECK NOTEBOOK ALSO COLLAPSABLE BAR
    let newCards = []
    for (const card of activeCards) {
      if (card.correct === false) {
        card.userAnswer=null
        card.correct=null
        newCards.push(card)
      }
    }
    if (!newCards.length) {
      return (<div>placeholder for finish</div>)
    }
    setActiveCards(newCards)
    setTotal(newCards.length)
    setRemaining(newCards.length)
    setNumCorrect(0)
    changeCard(0)
    checkCorrect(true)

  }
  return (
    <div className={styles.fullPage}>
      <div className={styles.writeHolder}>
        <ProgressArea
          total={total}
          remaining={remaining}
          correct={numCorrect}
          incorrect={total - remaining - numCorrect}
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
          fullscreenEnter={fullscreenEnter}
          onIncorrect={onIncorrect}
          roundCards={roundCards}
          onRoundContinue={onRoundContinue}
          refs={writePageRefs}
        />
      </div>
    </div>
  );
};

export default Write;
