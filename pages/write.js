import Write from "../components/write.js";

const cards = [
  {
    question: "who wrote the declaration of independance",
    answer: "thomas jefferson",
  },
  { question: "who is gay", answer: "mr. mackey" },
  { question: "who is bob", answer: "blah!" },
];

function WriteMode() {
  return <Write cardData={cards} />;
}

export default WriteMode;
