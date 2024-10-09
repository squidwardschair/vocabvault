export type ClientCard = {
  question: string;
  answer: string;
  correct: boolean | null;
  userAnswer: string | null;
  learnStatus: number;
  id: number;
  learnRecaps: number[]
  isEmpty?: boolean;
  questionLanguage: string;
  answerLanguage: string;
};
export type questionProps = {
  cardData: ClientCard[];
};

export type newCardProps = {
  question: string;
  answer: string;
  questionLanguage: string;
  answerLanguage: string;
}