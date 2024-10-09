import styles from "../styles/write.module.css";
import { useState, useEffect, ChangeEventHandler } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { newCardProps } from "../types/questions";
import {ChangeEvent} from "react";

type createCardProps = {
  card: newCardProps;
  cardIndex: number;
  deleteCard(index: number): void;
  editCard(index: number, isQuestion: boolean, change: string): void;
};
const CreateCard = ({
  card,
  cardIndex,
  deleteCard,
  editCard,
}: createCardProps) => {
  const [cards, addCard] = useState([]);

  const onDelete = () => {
    deleteCard(cardIndex);
  };

  const questionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    editCard(cardIndex, true, e.currentTarget.value);
  };

  const answerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    editCard(cardIndex, false, e.currentTarget.value);
  };
  return (
    <div className={styles.createCard}>
      <div className={styles.newCardHeader}>
        <span className={styles.createSmallHeader}>{(cardIndex += 1)}</span>
        <div className={styles.createDeleteButton}>
          <span className={styles.createDeleteText} onClick={() => onDelete()}>
            Delete
          </span>
        </div>
      </div>
      <div className={styles.newCardWriting}>
        <div className={styles.newCardWriteBox}>
          <TextareaAutosize
            className={styles.newCardWriteArea}
            onChange={questionChange}
            placeholder="Enter term, ie 'effulgent'"
            value={card.question}
          >
          </TextareaAutosize>
          <span className={styles.newCardFooter}>Term</span>
        </div>
        <div className={styles.newCardWriteBox}>
          <TextareaAutosize
            className={styles.newCardWriteArea}
            onChange={answerChange}
            placeholder="Enter definition, ie 'radiant, splendorous'"
            value={card.answer}
          >
          </TextareaAutosize>
          <span className={styles.newCardFooter}>Definition</span>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
