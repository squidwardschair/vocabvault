import WritePage from "../components/writepage.js";

const cards = [
  {
    question: "who wrote the declaration of independance",
    answer: "thomas jefferson",
  },
  { question: "who is gay", answer: "mr. mackey" },
  { question: "who is bob", answer: "blah!" },
];

function Write() {
  return <WritePage cardData={cards} />;
}

export default Write;
