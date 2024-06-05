import FlashcardHolder from '../components/flashcardholder'


const cards = [
  {question: "who wrote the declaration of independance", answer: "thomas jefferson", correct: null},
  {question: "who is gay", answer: "mr. mackey", correct: null},
  {question: "who is bob", answer: "blah!", correct: null}
]

function App() {
  return (
    <FlashcardHolder cardData={cards} />
  );
}

export default App;
