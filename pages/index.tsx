import FlashcardHolder from "../components/flashcardholder";

const cards = [
  {
    question: "who wrote the declaration of independance",
    answer: "thomas jefferson",
    correct: null,
    userAnswer: null,
  },
  {
    question: "who is the counselor on south park",
    answer: "mr. mackey",
    correct: null,
    userAnswer: null,
  },
  { question: "who is bob", answer: "blah!", correct: null, userAnswer: null },
];
function App() {
  return <FlashcardHolder cardData={cards} />;
}

export default App;
