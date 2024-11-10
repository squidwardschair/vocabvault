import styles from "../styles/write.module.css";
import { newCardProps } from "../types/questions"
import CreateCard from "./createCards"

type createCardListProps = {
    cards: newCardProps[]
    deleteCard(index:number): void;
    editCard(index:number, isQuestion: number, change: string): void
}

const CreateCardList = ({ cards, deleteCard, editCard }: createCardListProps) => {
    return (
        <div className={styles.createCardHolder}>
            {cards.map((card, index) => (
                <CreateCard card={card} cardIndex={index} deleteCard={deleteCard} editCard={editCard} key={index}/>
            ))}
        </div>
    )
}

export default CreateCardList