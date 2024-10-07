import React, { useState, MouseEventHandler } from "react";
import Flashcard from "./flashcard";
import styles from "../styles/App.module.css";
import { ClientCard, questionProps } from "../types/index"

const FlashcardHolder = ({ cardData }: questionProps) => {
  const [currentCard, setCard] = useState(0);

  const [side, flipper] = useState(true);

  function flip_card() {
    flipper(!side);
  }

  const nextCard = () => {
    const nextIndex = (currentCard + 1) % cardData.length;
    setCard(nextIndex);
    if (!side) {
      flip_card();
    }
  };

  const previousCard = () => {
    const previousIndex = (currentCard + 1) % cardData.length;
    setCard(previousIndex);
    if (!side) {
      flip_card();
    }
  };
  console.log(currentCard);
  return (
    <div className={styles.studyArea}>
      <div className={styles["card-holder"]}>
        {cardData.map((card, index) => (
          <Flashcard
            question={card.question}
            answer={card.answer}
            key={index}
            active={index === currentCard}
            side={side}
            onClick={() => flip_card()}
          ></Flashcard>
        ))}
      </div>
      <div className={styles.flashcardButtonHolder}>
        <button className={styles.flashcardButton} onClick={previousCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        <button className={styles.flashcardButton} onClick={nextCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FlashcardHolder;
