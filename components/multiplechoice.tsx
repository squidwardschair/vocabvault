import styles from "../styles/write.module.css";
import ProgressArea from "./progressarea";

type Card = {
  question: string;
  answer: string;
  correct: boolean | null;
};

type mcProps = {
  cardData: Card[];
};

const MultipleChoice = ({ cardData }: mcProps) => {
  return (
    <div className={styles.fullPage}>
      <div className={styles.writeHolder}>
        <ProgressArea total={15} remaining={10} correct={4} incorrect={1} />
        <div className={styles.writingArea}>
          <div className={styles.termHeader}>
            <span className={styles.termText}>
              Who are the founding fathers?
            </span>
            <span className={styles.skip}>Skip</span>
          </div>
          <div className={styles.mcAnswerBox}>
            <span className={styles.bpaText}>
              Select the best possible answer
            </span>
            <div className={styles.mcAnswerArea}>
              <div className={styles.mcAnswerChoice}>
                <div className={styles.mcChoiceLabel}>A</div>
                <span className={styles.answerChoiceText}>
                  Lorem ipsum dorum
                </span>
              </div>
              <div className={styles.mcAnswerChoice}>
                <div className={styles.mcChoiceLabel}>B</div>
                <span className={styles.answerChoiceText}>
                  Lorem ipsum dorum
                </span>
              </div>
              <div className={styles.mcAnswerChoice}>
                <div className={styles.mcChoiceLabel}>C</div>
                <span className={styles.answerChoiceText}>
                  Lorem ipsum dorum
                </span>
              </div>
              <div className={styles.mcAnswerChoice}>
                <div className={styles.mcChoiceLabel}>D</div>
                <span className={styles.answerChoiceText}>
                  Lorem ipsum dorum
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
