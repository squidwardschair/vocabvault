import MemoryWrite, { WriteRefs } from "./memorypage";
import MemoryEvaluate from "./memoryevaluate";
import {
  useState,
  useRef,
  LegacyRef,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import styles from "../styles/write.module.css";
import { ClientCard } from "../types/index";

export type writeProps = {
  card: ClientCard;
  learnStateFunc(status: boolean): void;
  learnCorrectFunc(correct: boolean | null | number): void;
};

type DisplayProps = {
  onWrite: boolean | null;
  question: string;
  onAnswer(): void;
  answer: string;
  useranswer: string;
  onContinue(status: number): void;
  onChange: FormEventHandler;
  text: string;
  handleEnter: KeyboardEventHandler;
  fullscreenEnter(correct: boolean): void;
  refs: LegacyRef<WriteRefs>;
  enterStatus: boolean | null;
  setInput(text: string): void;
  answerLanguage: string;
};

const DisplayWrite = ({
  onWrite,
  question,
  onAnswer,
  answer,
  useranswer,
  onContinue,
  onChange,
  text,
  handleEnter,
  setInput,
  answerLanguage,
  refs,
}: DisplayProps) => {
  if (onWrite) {
    return (
      <MemoryWrite
        ref={refs}
        term={answer}
        onAnswer={() => onAnswer()}
        onChange={(e) => onChange(e)}
        text={text}
        handleEnter={(e) => handleEnter(e)}
        setInput={(text) => setInput(text)}
        answerLanguage={answerLanguage}
      />
    );
  } else {
    return (
      <MemoryEvaluate
        term={question}
        answer={answer}
        useranswer={useranswer}
        onContinue={onContinue}
      />
    );
  }
};
const Memory = ({
  card,
  learnStateFunc,
  learnCorrectFunc,
}: writeProps) => {
  const [input, setInput] = useState<string>("");
  const [correct, checkCorrect] = useState<boolean | null>(true);
  const [enterStatus, fullscreenEnter] = useState<boolean | null>(false);
  const writePageRefs = useRef<WriteRefs>(null);

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

  const onAnswer = () => {
    checkCorrect(false)
  };

  const onContinue = (status: number) => {
    learnStateFunc(true);
    learnCorrectFunc(status);
  };

  return (
    <div className={`${styles.learnModeHeight} ${styles.writeHolder}`}>
      <DisplayWrite
        onWrite={correct}
        question={card.question}
        onAnswer={onAnswer}
        answer={card.answer}
        useranswer={input
          .replace(/<br ?\/?>/g, "\n")
          .replace(/(&nbsp;)|(^[ \t]+)|(\s+$)/g, "")}
        onContinue={onContinue}
        onChange={changeInput}
        text={input}
        handleEnter={handleEnter}
        fullscreenEnter={fullscreenEnter}
        enterStatus={enterStatus}
        setInput={setInput}
        answerLanguage={card.answerLanguage}
        refs={writePageRefs}
      />
    </div>
  );
};

export default Memory;
