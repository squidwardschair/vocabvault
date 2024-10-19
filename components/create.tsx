import styles from "../styles/write.module.css";
import CreateCardList from "./createCardLists";
import TextareaAutosize from "react-textarea-autosize";
import { useState, useRef } from "react";
import { newCardProps } from "../types/questions";
import Router from "next/router";

const Create = () => {
  const [cards, editCards] = useState<newCardProps[]>([]);
  const [errorMsg, editErrorMsg] = useState<string>("");
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const addCard = () => {
    editCards([
      ...cards,
      { question: "", answer: "", questionLanguage: "EN", answerLanguage: "EN"},
    ]);
  };

  const editCard = (index: number, isQuestion: number, change: string) => {
    const nextCards = cards.map(card => {
        if (cards.indexOf(card)==index-1) {
            if (isQuestion==0) {
                return {
                    ...card,
                    question: change
                }
            } else if (isQuestion==1) {
                return {
                    ...card,
                    answer: change
                }
            } else if (isQuestion==2) {
              return {
                ...card,
                questionLanguage: change
              }
            } else {
              return {
                ...card,
                answerLanguage: change
            } 
          }
        } else {
            return card
        }
    })
    editCards(nextCards)
}
  const deleteCard = (index: number) => {
    editCards(cards.filter((_, i) => i !== index - 1));
  };

  const createSet = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (cards.length < 5) {
      editErrorMsg(
        "Error creating set - 5 cards or greater are needed to create a set"
      );
      return;
    }
    if (!titleRef.current || !descriptionRef.current) {
      editErrorMsg("Error creating set - Title or description missing");
      return;
    } else if (
      !/\S/.test(titleRef.current.value) ||
      !/\S/.test(descriptionRef.current.value)
    ) {
      editErrorMsg("Error creating set - Title or description missing");
      return;
    }
    if (
      cards.filter((c) => /\S/.test(c.question) && /\S/.test(c.question))
        .length == cards.length
    ) {
      alert("yoooooo");
      try {
        const setBody = {
          name: titleRef?.current?.value,
          description: descriptionRef?.current?.value,
          questionLanguage: "EN",
          answerLanguage: "EN",
        };
        const setPost = await fetch("/api/set/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(setBody),
        });
        const setResponse = await setPost.json();
        for (const c of cards) {
          const newBody = { ...c, setId: setResponse.id };
          await fetch("/api/card/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBody),
          });
        }
        await Router.push(`/sets/${setResponse.id}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      editErrorMsg("Error creating set - Card fields are empty");
    }
  };

  return (
    <div className={styles.createBox}>
      <div className={styles.topCreateBox}>
        <div className={styles.topBoxHeader}>
          <span className={styles.createBold}>Create a new flashcard set</span>
          <div className={styles.createButton} onClick={(e) => createSet(e)}>
            <span className={styles.createButtonText}>Create</span>
          </div>
        </div>
        <span className={styles.errorBold}>{errorMsg}</span>
        <TextareaAutosize
          ref={titleRef}
          className={styles.createTitle}
          maxLength={100}
          placeholder="Enter a title..."
        ></TextareaAutosize>
        <TextareaAutosize
          ref={descriptionRef}
          className={styles.createDescription}
          maxLength={500}
          placeholder="Enter a description..."
        ></TextareaAutosize>
        <div className={styles.topBoxFooter}>
          <button className={styles.bottomButtons} onClick={() => addCard()}>
            <span className={styles.createButtonText}>Add card</span>
          </button>
          <button className={styles.bottomButtons}>
            <span className={styles.createButtonText}>Import</span>
          </button>
        </div>
        <CreateCardList
          cards={cards}
          deleteCard={deleteCard}
          editCard={editCard}
        />
      </div>
    </div>
  );
};

export default Create;
