import styles from "../styles/write.module.css";
import { ClientCard } from "../types/index";

type learnProgressProps = {
    cards: ClientCard[]
}

const learnStyles = ["", styles.progressOne, styles.progressTwo, styles.progressThree, styles.progressThree, styles.progressFour, styles.progressFive]
const LearnProgress = ({ cards }: learnProgressProps) => {
    return (
        <div className={styles.learnProgressHolder}>
            {cards.map((card, index) => (
                <div className={`${styles.learnProgressCard} ${learnStyles[card.learnStatus]} ${index==(cards.length-1) ? styles.lastProgress : ''}`} key={index}></div>
            ))}
        </div>
    )
}

export default LearnProgress