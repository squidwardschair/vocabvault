import styles from "../styles/write.module.css";
import CreateCard from "./createCards"
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useEffect } from "react";

const Create = () => {
    const [cards, addCard] = useState([])
    return (

        <div className={styles.createBox}>
            <div className={styles.topCreateBox}>
                <div className={styles.topBoxHeader}>
                    <span className={styles.createBold}>Create a new flashcard set</span>
                    <div className={styles.createButton}>
                        <span className={styles.createButtonText}>Create</span>
                    </div>
                </div>
                <TextareaAutosize className={styles.createTitle} maxLength={100} placeholder="Enter a title..."></TextareaAutosize>
                <TextareaAutosize className={styles.createDescription} maxLength={500} placeholder="Enter a description..."></TextareaAutosize>
                <div className={styles.topBoxFooter}>
                    <div className={styles.bottomButtons}>
                    <span className={styles.createButtonText}>Add card</span>
                    </div>
                    <div className={styles.bottomButtons}>
                    <span className={styles.createButtonText}>Import</span>

                    </div>
                </div>
            </div>
            <CreateCard />
        </div>
    )
}

export default Create