import { usePathname } from "next/navigation";
import styles from "../styles/write.module.css";
import { ClientCard } from "../types/index";
import { useEffect } from "react";
import Router from "next/router";

type learnRecapProps = {
  cards: ClientCard[];
};

const RecapHolder = ({ card }: { card: ClientCard }) => {
  return (
    <div className={styles.recapAnswers}>
      <div className={styles.recapTerm}>
        <span className={styles.overallText}>{card.answer}</span>
      </div>
      <div className={styles.recapAnswer}>
        <div className={styles.learnRecapBar}>
          <div className={`${styles.learnProgressCard} ${styles.progressOne}`}>
            {card.learnRecaps[0]}
          </div>
          <div
            className={`${styles.learnProgressCard} ${styles.progressTwo}`}
          >
            {card.learnRecaps[1]}
          </div>
          <div
            className={`${styles.learnProgressCard} ${styles.progressFour} ${styles.lastProgress}`}
          >
            {card.learnRecaps[2]}
          </div>
        </div>
      </div>
    </div>
  );
};

const LearnFinal = ({ cards }: learnRecapProps) => {
  const path = usePathname()
  const onClick = () => {
    Router.push(path.substring(0, path.length-5))
  }
  return (
    <div className={`${styles.learnModeHeight} ${styles.writeHolder}`}>
      <div className={styles.writingArea}>
        <div className={styles.termHeader}>
          <span className={`${styles.termText} ${styles.bold}`}>
            Learn Recap
          </span>
        </div>
        <div className={styles.recapHolder}>
          {cards.map((card, index) => (
            <RecapHolder card={card}></RecapHolder>
          ))}
        </div>
        <div className={styles.continueButtonBox}>
          <button className={styles.continueButton}>
            <span className={styles.buttonText} onClick={onClick}>Finish</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnFinal;
