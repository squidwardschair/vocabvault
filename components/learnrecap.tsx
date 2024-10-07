import styles from "../styles/write.module.css";
import { ClientCard } from "../types/index";
import { useEffect } from "react";

type learnRecapProps = {
  cards: ClientCard[];
  setRecap(recap: boolean | null): void;
};

const LearnRecap = ({ cards, setRecap }: learnRecapProps) => {
  const onContinue = () => {
    setRecap(null);
  };

  const resultEnter = (e: KeyboardEvent) => {
    if (e.key=="Enter") {
      e.preventDefault();
      onContinue();
    }
  };
  useEffect(() => {
    console.log("blah");
    document.addEventListener("keydown", resultEnter);

    return function cleanup() {
      document.removeEventListener("keydown", resultEnter);
    };
  }, [resultEnter]);
  let newCards = cards.filter((card) => {
    return card.learnStatus == 0;
  });
  let struggleCards = cards.filter((card) => {
    return card.learnStatus == 1 || card.learnStatus == 2;
  });
  let learntCards = cards.filter((card) => {
    return card.learnStatus == 3 || card.learnStatus == 4;
  });
  let masteredCards = cards.filter((card) => {
    return card.learnStatus == 5;
  });
  let length = cards.length;
  return (
    <div className={`${styles.learnModeHeight} ${styles.writeHolder}`}>
      <div className={styles.writingArea}>
        <div className={styles.termHeader}>
          <span className={`${styles.termText} ${styles.bold}`}>
            Round Recap
          </span>
        </div>
        <div className={styles.smallerTextHolder}>
          <span className={styles.smallerTermText}>{`Haven't learned: ${
            newCards.length
          }/${length} - ${((newCards.length / length) * 100).toFixed(
            0
          )}%`}</span>
          <span className={styles.smallerTermText}>{`Still learning: ${
            struggleCards.length
          }/${length} - ${((struggleCards.length / length) * 100).toFixed(
            0
          )}%`}</span>
          <span className={styles.smallerTermText}>{`Recognized: ${
            learntCards.length
          }/${length} - ${((learntCards.length / length) * 100).toFixed(
            0
          )}%`}</span>
          <span className={styles.smallerTermText}>{`Mastered: ${
            masteredCards.length
          }/${length} - ${((masteredCards.length / length) * 100).toFixed(
            0
          )}%`}</span>
        </div>
        <div className={`${styles.mcContinueBox} ${styles.mcContinueDisplay}`}>
          <span className={`${styles.keyContinueText} ${styles.continueExtraMargin}`}>
            Press Enter to continue
          </span>
          <button
            className={styles.mcContinueButton}
            onClick={() => onContinue()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnRecap;
