export type Card = {
  question: string;
  answer: string;
  correct: boolean | null;
  userAnswer: string | null;
};
export type questionProps = {
  cardData: Card[];
};