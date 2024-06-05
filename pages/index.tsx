import FlashcardHolder from '../components/flashcardholder'


const cards = [
  {question: "who wrote the declaration of independance", answer: "thomas jefferson"},
  {question: "who is gay", answer: "mr. mackey"},
  {question: "who is bob", answer: "blah!"}
]

function App() {
  return (
    <FlashcardHolder cards={cards} />
  );
}

export default App;
