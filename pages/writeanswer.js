import WriteResult from "../components/writeresult.js";

const cards = [
  {
    question: "who wrote the declaration of independance",
    answer: "thomas jefferson",
  },
  { question: "who is gay", answer: "mr. mackey" },
  { question: "who is bob", answer: "blah!" },
];

function WriteAnswer() {
  return <WriteResult cardData={cards} />;
}

export default WriteAnswer;
