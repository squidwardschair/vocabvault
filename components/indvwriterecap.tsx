import styles from "../styles/write.module.css";
import RecapRound from "./recapround";
import { ClientCard } from "../types/index"
import { useEffect } from 'react'

type progressProps = {
  round: ClientCard[];
  roundNum: number;
  onContinue(): void;
  roundPercent: string;
  enterStatus: boolean|null;
  fullscreenEnter(correct: boolean): void;
  isFinished: boolean;
};

const IndvWriteRecap = ({ round, onContinue, roundNum, roundPercent, enterStatus, fullscreenEnter, isFinished }: progressProps) => {
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
      <RecapRound key={"roundRecap"} index={0} cards={round} round={roundNum + 1} roundPercent={roundPercent} onIndvContinue={() => null} isFinished={false} />
      <div className={styles.continueButtonBox}>
        <button className={styles.continueButton} onClick={onContinue}>
          <span className={styles.buttonText}>Continue</span>
        </button>
      </div>
    </div>
  );
};

export default IndvWriteRecap;