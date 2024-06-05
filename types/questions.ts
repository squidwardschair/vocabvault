export type Card = {
  question: string;
  answer: string;
  correct: boolean | null;
};
export type questionProps = {
  cardData: Card[];
};