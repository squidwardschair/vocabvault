import styles from "../styles/write.module.css";
import RecapRound from "./recapround";
import { ClientCard } from "../types/index"
import { useEffect } from 'react'

type progressProps = {
  rounds: ClientCard[][];
  onContinue(): void;
  roundPercents: string[];
  enterStatus: boolean|null;
  fullscreenEnter(correct: boolean): void;
  onIndvContinue(index: number): void
  isFinished: boolean;
};

const FullWriteRecap = ({ rounds, onContinue, roundPercents, enterStatus, fullscreenEnter, onIndvContinue, isFinished }: progressProps) => {
  const resultEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && enterStatus) {
      e.preventDefault();
      onContinue();
    }
    if (enterStatus===null) {
      fullscreenEnter(true)
    }
  };
  useEffect(() => {
    console.log("blah");
    document.addEventListener("keydown", resultEnter);

    return function cleanup() {
      document.removeEventListener("keydown", resultEnter);
    };
  }, [resultEnter]);
  return (
    <div className={styles.writingArea}>
      {rounds.map((round, index) => (
        <RecapRound key={index} index={index} cards={round} round={index + 1} roundPercent={roundPercents[index]} onIndvContinue={onIndvContinue} isFinished={isFinished}></RecapRound>
      ))}
      <div className={styles.continueButtonBox}>
        <button className={styles.continueButton} onClick={onContinue}>
          <span className={styles.buttonText}>Finish</span>
        </button>
      </div>
    </div>
  );
};

export default FullWriteRecap;
