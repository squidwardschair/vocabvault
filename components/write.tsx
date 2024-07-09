import WritePage, { WriteRefs } from "./writepage";
import WriteResult from "./writeresult";
import ProgressArea from "./progressarea";
import FullWriteRecap from "./fullwriterecap";
import IndvWriteRecap from "./indvwriterecap";
import {
  useState,
  useRef,
  useEffect,
  LegacyRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import styles from "../styles/write.module.css";
import { Card } from "../types/index";
import LearnProgress from "./learnprogress"

export type writeProps = {
  cardData: Card[];
  learnMode: boolean;
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
  roundCards: Card[][];
  onRoundContinue(): void;
  roundPercents: string[];
  onIndvContinue(index: number): void;
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
  roundCards,
  onRoundContinue,
  roundPercents,
  onIndvContinue,
  isFinished,
  refs,
}: DisplayProps) => {
  if (onWrite === null) {
    if (isFinished) {
      return (
        <FullWriteRecap
          rounds={roundCards}
          roundPercents={roundPercents}
          onContinue={() => onRoundContinue()}
          enterStatus={enterStatus}
          fullscreenEnter={(correct) => fullscreenEnter(correct)}
          onIndvContinue={(index) => onIndvContinue(index)}
          isFinished={isFinished}
        />
      );
    } else {
      return (
        <IndvWriteRecap
          round={roundCards[roundCards.length - 1]}
          roundPercent={roundPercents[roundPercents.length - 1]}
          roundNum={roundCards.length - 1}
          onContinue={() => onRoundContinue()}
          enterStatus={enterStatus}
          fullscreenEnter={fullscreenEnter}
          isFinished={false}
        />
      );
    }
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
        enterStatus={enterStatus}
      />
    );
  }
};
const Write = ({ cardData, learnMode }: writeProps) => {
  const [activeCards, setActiveCards] = useState<Card[]>(cardData);
  const [currentCard, changeCard] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [correct, checkCorrect] = useState<boolean | null>(true);
  const [remaining, setRemaining] = useState<number>(activeCards.length);
  const [total, setTotal] = useState<number>(activeCards.length);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [enterStatus, fullscreenEnter] = useState<boolean | null>(false);
  const [answerAnimation, triggerAnimation] = useState<boolean>(false);
  const [roundCards, addRoundCard] = useState<Card[][]>([]);
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
      input.toLowerCase().replace(/(<br ?\/?>)|(&nbsp;)|(^[ \t]+)|(\s+$)/g, "") ==
      activeCards[currentCard].answer
        .toLowerCase()
        .replace(/(<br ?\/?>)|(&nbsp;)|(^[ \t]+)|(\s+$)/g, "")
    ) {
      writePageRefs?.current?.answerButtonRef?.current?.classList.add(
        styles.correctAnimation
      );
      writePageRefs!.current!.answerButtonTextRef!.current!.innerHTML =
        "Correct!";
      triggerAnimation(true);
      answerState(true);
      const nextIndex = currentCard + 1;
      if (nextIndex >= activeCards.length) {
        onFinish(true);
        checkCorrect(null);
        if (enterStatus != null) {
          fullscreenEnter(true);
        }
      } else {
        setInput("");
        writePageRefs!.current!.inputRef!.current!.innerHTML = "";
        changeCard(nextIndex);
      }
    } else {
      console.log("blue");
      checkCorrect(false);
      if (enterStatus != null) {
        fullscreenEnter(true);
      }
    }
  };

  const onContinue = () => {
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

  const onIndvContinue = (index: number) => {
    let newCards: Card[];
    newCards = [...roundCards[index]];
    for (const card of newCards) {
      card.userAnswer = null;
      card.correct = null;
    }
    addRoundCard([])
    addRoundPercent([])
    setFinishedState(false)
    setActiveCards(newCards);
    setTotal(newCards.length);
    setRemaining(newCards.length);
    setNumCorrect(0);
    changeCard(0);
    checkCorrect(true);  
  }
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
    setActiveCards(newCards);
    setTotal(newCards.length);
    setRemaining(newCards.length);
    setNumCorrect(0);
    changeCard(0);
    checkCorrect(true);
  };

  if (learnMode) {
    return (
        <div className={styles.writeHolder}>
          <DisplayWrite
            onWrite={correct}
            question={activeCards[currentCard].question}
            onAnswer={onAnswer}
            answer={activeCards[currentCard].answer}
            useranswer={input.replace(/<br ?\/?>/g, "\n").replace(/(&nbsp;)|(^[ \t]+)|(\s+$)/g, "")}
            onSkip={onSkip}
            onOverride={onOverride}
            onContinue={onContinue}
            onChange={changeInput}
            text={input}
            handleEnter={handleEnter}
            fullscreenEnter={fullscreenEnter}
            enterStatus={enterStatus}
            roundCards={roundCards}
            onRoundContinue={onRoundContinue}
            roundPercents={roundPercents}
            onIndvContinue={onIndvContinue}
            isFinished={finishedState}
            refs={writePageRefs}
          />
        </div>
    );
  } else {
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
            useranswer={input.replace(/<br ?\/?>/g, "\n").replace(/(&nbsp;)|(^[ \t]+)|(\s+$)/g, "")}
            onSkip={onSkip}
            onOverride={onOverride}
            onContinue={onContinue}
            onChange={changeInput}
            text={input}
            handleEnter={handleEnter}
            fullscreenEnter={fullscreenEnter}
            enterStatus={enterStatus}
            roundCards={roundCards}
            onRoundContinue={onRoundContinue}
            roundPercents={roundPercents}
            onIndvContinue={onIndvContinue}
            isFinished={finishedState}
            refs={writePageRefs}
          />
        </div>
        <LearnProgress cards={cardData} />
      </div>
    );
  }

};

export default Write;
