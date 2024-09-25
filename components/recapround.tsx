import styles from "../styles/write.module.css";
import RecapHolder from "./recapholder";
import { Card } from "../types/index"

type roundProps = {
  cards: Card[];
  round: number;
  roundPercent: string;
  onIndvContinue(index: number): void;
  index: number;
  isFinished: boolean;
};

const FinishedContinue = ({ isFinished, onIndvContinue, index }: { isFinished: boolean | null, onIndvContinue(index:number): void, index: number }) => {
  if (isFinished) {
    return (
      <span className={styles.skip} onClick={() => onIndvContinue(index)}>Restart from this round</span>
    )
  } else {
    return null
  }
}
const RecapRound = ({ index, cards, round, roundPercent, onIndvContinue, isFinished }: roundProps) => {
  console.log(cards);
  return (
    <>
      <div className={styles.termHeader}>
        <span
          className={`${styles.termText} ${styles.bold}`}
        >{`Round ${round}`}</span>
        <FinishedContinue isFinished={isFinished} onIndvContinue={onIndvContinue} index={index} />
      </div>
      <span className={styles.smallerTermText}>{roundPercent}</span>
      <div className={styles.recapHolder}>
        {cards.map((card, index) => (
          <RecapHolder
            key={index}
            question={card.question}
            answer={card.answer}
            correct={card.correct}
            userAnswer={card.userAnswer}
            learnStatus={card.learnStatus}
            id={card.id}
            learnRecaps={card.learnRecaps}
          ></RecapHolder>
        ))}
      </div>
    </>
  );
};

export default RecapRound;
