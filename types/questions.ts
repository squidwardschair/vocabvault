export type Card = {
  question: string;
  answer: string;
  correct: boolean | null;
  userAnswer: string | null;
  learnStatus: number;
  isEmpty?: boolean;
};
export type questionProps = {
  cardData: Card[];
};