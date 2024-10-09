import styles from "../styles/write.module.css";
import CreateCardList from "./createCardLists"
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useRef } from "react";
import { newCardProps } from "../types/questions"
import Router from "next/router";

const Create = () => {
    const [cards, editCards] = useState<newCardProps[]>([])
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const addCard = () => {
        editCards([...cards,{question: "", answer: "", questionLanguage: "", answerLanguage: ""}])
    }

    const editCard = (index: number, isQuestion: boolean, change: string) => {
        const nextCards = cards.map(card => {
            if (cards.indexOf(card)==index-1) {
                if (isQuestion) {
                    return {
                        ...card,
                        question: change
                    }
                } else {
                    return {
                        ...card,
                        answer: change
                    }
                }
            } else {
                return card
            }
        })
        editCards(nextCards)
    }
    const deleteCard = (index: number) => {
        editCards(cards.filter((_, i) => i!==index-1))
    }

    const createSet = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const setBody = {name: titleRef?.current?.value, description: descriptionRef?.current?.value, questionLanguage: "EN", answerLanguage: "EN"}
            const setPost = await fetch('/api/set/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(setBody),
              });
            const setResponse = await setPost.json()
            for (const c of cards) {
                const newBody = {...c, setId: setResponse.id}
                await fetch('/api/card/post', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify(newBody)
                })
            }
            await Router.push(`/sets/${setResponse.id}`)
        } catch (error) {
            console.error(error)
        }
    }
    return (

        <div className={styles.createBox}>
            <div className={styles.topCreateBox}>
                <div className={styles.topBoxHeader}>
                    <span className={styles.createBold}>Create a new flashcard set</span>
                    <div className={styles.createButton} onClick={(e) => createSet(e)}>
                        <span className={styles.createButtonText}>Create</span>
                    </div>
                </div>
                <TextareaAutosize ref={titleRef} className={styles.createTitle} maxLength={100} placeholder="Enter a title..."></TextareaAutosize>
                <TextareaAutosize ref={descriptionRef} className={styles.createDescription} maxLength={500} placeholder="Enter a description..."></TextareaAutosize>
                <div className={styles.topBoxFooter}>
                    <div className={styles.bottomButtons} onClick={() => addCard()}>
                    <span className={styles.createButtonText}>Add card</span>
                    </div>
                    <div className={styles.bottomButtons}>
                    <span className={styles.createButtonText}>Import</span>

                    </div>
                </div>
                <CreateCardList cards={cards} deleteCard={deleteCard} editCard={editCard}/>
            </div>
        </div>
    )
}

export default Create