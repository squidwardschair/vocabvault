import MultipleChoice from "../components/multiplechoice";

const cards = [
  {
    question: "a challenge",
    answer: "un desafío/reto",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 0,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "the helmet",
    answer: "el casco",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 1,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "fishing rod",
    answer: "la caña",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 2,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "bait",
    answer: "la carnada",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 3,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "scooter/skateboard",
    answer: "la patineta",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 4,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "knee pad",
    answer: "la rodillera",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 5,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "elbow brace",
    answer: "la codera",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 6,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "surfboard",
    answer: "la tabla de surf",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 7,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "snowboard",
    answer: "la tabla de nieve",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 8,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "wave",
    answer: "la ola",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 9,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "training/practice session",
    answer: "el entrenamiento",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 10,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "diving board",
    answer: "el trampolín",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 11,
    learnRecaps: [0, 0, 0]
  },
  {
    question: "platform",
    answer: "la plataforma",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
    id: 12,
    learnRecaps: [0, 0, 0]
  },
];

const McMode = () => {
  return <MultipleChoice card={cards[3]} cardIndex={3} cardData={cards} learnStateFunc={(() => false)} learnCorrectFunc={(() => false)}/>;
};

export default McMode;
