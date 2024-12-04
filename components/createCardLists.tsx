import styles from "../styles/write.module.css";
import { newCardProps } from "../types/questions"
import CreateCard from "./createCards"

type createCardListProps = {
    cards: newCardProps[];
    defaultTermLang: string;
    defaultDefLang: string;
    deleteCard(index:number): void;
    editCard(index:number, isQuestion: number, change: string): void
}

const CreateCardList = ({ cards, defaultTermLang, defaultDefLang, deleteCard, editCard }: createCardListProps) => {
    return (
        <div className={styles.createCardHolder}>
            {cards.map((card, index) => (
                <CreateCard card={card} cardIndex={index} deleteCard={deleteCard} editCard={editCard} key={index} defaultDefLang={defaultDefLang} defaultTermLang={defaultTermLang}/>
            ))}
        </div>
    )
}

export default CreateCardList