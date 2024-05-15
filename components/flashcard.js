import styles from '../styles/App.module.css';

export default function Flashcard ({question, answer, active, side, onClick}) {


    return (
        <div className={active ? styles.activeCard : styles.inactiveCard}>
            <div className={side ? styles.flashcard : `${styles.flashcard} ${styles.flipCard}`} onClick={onClick}>
                <div className={styles.cardBody}>{question}</div>
                <div className={`${styles.cardBody} ${styles.cardFlipBody}`} >{answer}</div>
            </div>
        </div>
        
    );
}

