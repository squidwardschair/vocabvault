import styles from "../styles/write.module.css";
import { useState, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const CreateCard = () => {
    const [cards, addCard] = useState([])
    return (

        <div className={styles.createCard}>
            <div className={styles.newCardHeader}>
                <span className={styles.createSmallHeader}>1</span>
                <div className={styles.createDeleteButton}>
                    <span className={styles.createDeleteText}>Delete</span>
                </div>
            </div>
            <div className={styles.newCardWriting}>
                <div className={styles.newCardWriteBox}>
                    <TextareaAutosize className={styles.newCardWriteArea} placeholder="Enter term, ie 'effulgent'"></TextareaAutosize>
                    <span className={styles.newCardFooter}>Term</span>
                </div>
                <div className={styles.newCardWriteBox}>
                    <TextareaAutosize className={styles.newCardWriteArea} placeholder="Enter definition, ie 'radiant, splendorous'"></TextareaAutosize>
                    <span className={styles.newCardFooter}>Definition</span>
                </div>
            </div>

        </div>
    )
}

export default CreateCard