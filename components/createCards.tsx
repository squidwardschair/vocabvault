import styles from "../styles/write.module.css";
import { useState, useEffect, ChangeEventHandler } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { newCardProps } from "../types/questions";
import { ChangeEvent } from "react";

type createCardProps = {
  card: newCardProps;
  cardIndex: number;
  defaultTermLang: string;
  defaultDefLang: string;
  deleteCard(index: number): void;
  editCard(index: number, isQuestion: number, change: string): void;
};
const CreateCard = ({
  card,
  cardIndex,
  defaultTermLang,
  defaultDefLang,
  deleteCard,
  editCard,
}: createCardProps) => {
  const [cards, addCard] = useState([]);

  const onDelete = () => {
    deleteCard(cardIndex);
  };

  const questionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    editCard(cardIndex, 0, e.currentTarget.value);
  };

  const answerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    editCard(cardIndex, 1, e.currentTarget.value);
  };

  const termLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    editCard(cardIndex, 2, e.currentTarget.value);
  }

  const answerLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    editCard(cardIndex, 3, e.currentTarget.value);
  }
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
          ></TextareaAutosize>
          <div className={styles.newCardSettings}>
            <span className={styles.newCardFooter}>Term</span>
            <select className={styles.languageSelect} onChange={termLangChange} tabIndex={-1}>
              <option value="EN" selected={defaultTermLang=="EN" ? true : undefined}>EN</option>
              <option value="ES" selected={defaultTermLang=="ES" ? true : undefined}>ES</option>
              <option value="FR" selected={defaultTermLang=="FR" ? true : undefined}>FR</option>
              <option value="DE" selected={defaultTermLang=="DE" ? true : undefined}>DE</option>
            </select>
          </div>
        </div>
        <div className={styles.newCardWriteBox}>
          <TextareaAutosize
            className={styles.newCardWriteArea}
            onChange={answerChange}
            placeholder="Enter definition, ie 'radiant, splendorous'"
            value={card.answer}
          ></TextareaAutosize>
          <div className={styles.newCardSettings}>
            <span className={styles.newCardFooter}>Definition</span>
            <select className={styles.languageSelect} onChange={answerLangChange} tabIndex={-1}>
              <option value="EN" selected={defaultDefLang=="EN" ? true : undefined}>EN</option>
              <option value="ES" selected={defaultDefLang=="ES" ? true : undefined}>ES</option>
              <option value="FR" selected={defaultDefLang=="FR" ? true : undefined}>FR</option>
              <option value="DE" selected={defaultDefLang=="DE" ? true : undefined}>DE</option>
            </select>
          </div>        
          </div>
      </div>
    </div>
  );
};

export default CreateCard;
