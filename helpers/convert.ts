import { Card, Set } from '@prisma/client'
import { ClientCard } from "../types/index";

type Convert = {
    cards: Card[]
}

const ConvertCards = (cards: Card[]) => {
    console.log(cards)
    let converted = []
    for (const card of cards) {
        let newCard = {} as ClientCard
        newCard.question = card.question
        newCard.answer = card.answer
        newCard.correct = null
        newCard.userAnswer = null
        newCard.learnStatus = 0
        newCard.id = card.id
        newCard.learnRecaps = [0, 0, 0]
        newCard.questionLanguage = card.questionLanguage
        newCard.answerLanguage = card.answerLanguage
        converted.push(newCard)
    }
    return converted
}

export default ConvertCards