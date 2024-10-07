import styles from "../styles/write.module.css";
import { ClientCard } from "../types/index";
import { useState, useEffect, useRef, RefObject, Dispatch, SetStateAction } from "react";

type mcProps = {
  card: ClientCard;
  cardIndex: number;
  cardData: ClientCard[];
  learnStateFunc(status: boolean): void;
  learnCorrectFunc(correct: boolean|null): void
};

const emptyClientCard = {
  question: "",
  answer:
    "",
  correct: null,
  userAnswer: null,
  learnStatus: 0,
  id: 0,
  learnRecaps: [0, 0, 0], 
  questionLanguage: "",
  answerLanguage: ""
}
const CorrectIcon = ({ correct }: { correct: boolean | null }) => {
  if (correct) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="#90ee90"
        className={styles.mcResultIcon}
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="#f08080"
        className={styles.mcResultIcon}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    );
  }
};

const shuffle = (array: ClientCard[]) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};
const MultipleChoice = ({ card, cardIndex, cardData, learnStateFunc, learnCorrectFunc }: mcProps) => {
  const [choices, generateChoices] = useState<(ClientCard)[]>([
    emptyClientCard,
    emptyClientCard,
    emptyClientCard,
    emptyClientCard,
  ]);
  const [isAnswered, triggerAnswer] = useState<boolean>(false)
  
  const [labelA, setlabelA] = useState<boolean|null>(null)
  const [labelB, setlabelB] = useState<boolean|null>(null)
  const [labelC, setlabelC] = useState<boolean|null>(null)
  const [labelD, setlabelD] = useState<boolean|null>(null)

  const labelStateFunctions: (Dispatch<SetStateAction<boolean | null>>)[] = [
    setlabelA,
    setlabelB,
    setlabelC,
    setlabelD,
  ]
  const continueBoxRef = useRef<HTMLDivElement>(null);

  const choiceZeroRef = useRef<HTMLDivElement>(null);
  const choiceOneRef = useRef<HTMLDivElement>(null);
  const choiceTwoRef = useRef<HTMLDivElement>(null);
  const choiceThreeRef = useRef<HTMLDivElement>(null);

  const choiceRefs: (RefObject<HTMLDivElement> | null)[] = [
    choiceZeroRef,
    choiceOneRef,
    choiceTwoRef,
    choiceThreeRef,
  ];
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {

    let answerChoices = [card];
    let remainingClientCard = [...cardData];
    remainingClientCard.splice(cardIndex, 1);
    console.log(remainingClientCard);
    for (let i = 0; i < 3; i++) {
      let choiceIndex = Math.floor(Math.random() * remainingClientCard.length);
      answerChoices.push(remainingClientCard[choiceIndex]);
      remainingClientCard.splice(choiceIndex, 1);
    }
    console.log(remainingClientCard);
    console.log(answerChoices);
    shuffle(answerChoices);
    generateChoices(answerChoices);
  }, [card]);
  console.log(choices);
  const onAnswer = (userAnswer: number) => {
    if (isAnswered) {
      return
    }
    if (choices[userAnswer] == card) {
      labelStateFunctions[userAnswer](true)
      choiceRefs[userAnswer]?.current?.classList?.add(styles.mcCorrectAnswer);
      learnCorrectFunc(true)
    } else {
      let correctIndex = choices.indexOf(card)
      labelStateFunctions[userAnswer](false)
      labelStateFunctions[correctIndex](true)
      choiceRefs[userAnswer]?.current?.classList?.add(styles.mcIncorrectAnswer);
      choiceRefs[correctIndex]?.current?.classList?.add(
        styles.mcCorrectOnIncorrectAnswer
      );
      learnCorrectFunc(false)
    }
    triggerAnswer(true)
    continueBoxRef?.current?.classList?.add(styles.mcContinueDisplay)
  };

  const onContinue = () => {
    learnStateFunc(true)
    for (const choice of choiceRefs) {
      choice?.current?.classList?.remove(styles.mcCorrectAnswer)
      choice?.current?.classList?.remove(styles.mcIncorrectAnswer)
      choice?.current?.classList?.remove(styles.mcCorrectOnIncorrectAnswer)
    }
    continueBoxRef?.current?.classList?.remove(styles.mcContinueDisplay)
    triggerAnswer(false)
    for (const icon of labelStateFunctions) {
      icon(null)
    }
  }

  const resultEnter = (e: KeyboardEvent) => {
    if ((e.key === "a"||e.key==="1"||e.key==="A") && !isAnswered) {
      e.preventDefault();
      onAnswer(0);
    }
    if ((e.key === "b"||e.key==="2"||e.key==="B") && !isAnswered) {
      e.preventDefault();
      onAnswer(1);
    }
    if ((e.key === "c"||e.key==="3"||e.key==="C") && !isAnswered) {
      e.preventDefault();
      onAnswer(2);
    }
    if ((e.key === "d"||e.key==="4"||e.key==="D") && !isAnswered) {
      e.preventDefault();
      onAnswer(3);
    }
    if (isAnswered && e.key=="Enter") {
      e.preventDefault();
      onContinue()
    }
  };
  useEffect(() => {
    console.log("blah");
    document.addEventListener("keydown", resultEnter);

    return function cleanup() {
      document.removeEventListener("keydown", resultEnter);
    };
  }, [resultEnter]);
  // checkmarks animation too 
  return (
      <div className={`${styles.learnModeHeight} ${styles.writeHolder}`}>
        <div className={`${styles.writingArea} ${styles.mcBottomPadding}`}>
          <div className={styles.termHeader}>
            <span className={styles.termText}>{card.question}</span>
          </div>
          <div className={styles.mcAnswerBox}>
            <span className={styles.bpaText}>
              Select the best possible answer
            </span>
            <div className={styles.mcAnswerArea}>
              <div
                className={styles.mcAnswerChoice}
                onClick={() => onAnswer(0)}
                ref={choiceZeroRef}
              >
                <div className={styles.mcChoiceLabel}>
                  {labelA===null ? `A` : <CorrectIcon correct={labelA}></CorrectIcon>}
                </div>
                <span className={styles.answerChoiceText}>
                  {choices[0].answer}
                </span>
              </div>
              <div
                className={styles.mcAnswerChoice}
                onClick={() => onAnswer(1)}
                ref={choiceOneRef}
              >
                <div className={styles.mcChoiceLabel}>
                  {labelB===null ? `B` : <CorrectIcon correct={labelB}></CorrectIcon>}
                </div>
                <span className={styles.answerChoiceText}>
                  {choices[1].answer}
                </span>
              </div>
              <div
                className={styles.mcAnswerChoice}
                onClick={() => onAnswer(2)}
                ref={choiceTwoRef}
              >
                <div className={styles.mcChoiceLabel}>
                  {labelC===null ? `C` : <CorrectIcon correct={labelC}></CorrectIcon>}
                </div>
                <span className={styles.answerChoiceText}>
                  {choices[2].answer}
                </span>
              </div>
              <div
                className={styles.mcAnswerChoice}
                onClick={() => onAnswer(3)}
                ref={choiceThreeRef}
              >
                <div className={styles.mcChoiceLabel}>
                  {labelD===null ? `D` : <CorrectIcon correct={labelD}></CorrectIcon>}
                </div>
                <span className={styles.answerChoiceText}>
                  {choices[3].answer}
                </span>
              </div>
            </div>
            <div className={styles.mcContinueBox} ref={continueBoxRef}>
              <span className={styles.keyContinueText}>
                Press Enter to continue
              </span>
              <button className={styles.mcContinueButton} onClick={() => onContinue()}>Continue</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MultipleChoice;
