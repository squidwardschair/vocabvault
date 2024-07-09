import MultipleChoice from "../components/multiplechoice";

const cards = [
  {
    question: "Census",
    answer:
      "population count every 10 years, to determine the number of representatives in Congress for each of the states.",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Checks and Balances",
    answer:
      "The power of the legislative, executive, and judicial branches of government to block some acts by the other two branches--ie. the veto, declaring a law unconstitutional, or impeaching a president.",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Electoral College",
    answer:
      "the body of electors who formally elect the United States president and vice-president",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Compromise of 1850",
    answer:
      "it abolished the slave trade in the District of Columbia, admitted California as a free state and opened much of the Mexican Cession to popular sovereignty",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Monroe Doctrine",
    answer:
      "Europeans should not interfere with affairs in Western Hemisphere, Americans to stay out of foreign affairs; supported Washington's goal for US neutrality in Americas",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Federalism",
    answer:
      "A system in which power is divided between the national and state governments",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Federalist Papers",
    answer:
      "Series of essays that defended the Constitution and tried to reassure Americans that the states would not be overpowered by the federal government.",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "House of Representatives",
    answer:
      'One of the two parts of Congress, considered the "lower house." Representatives are elected directly by the people, with the number of representatives for each state determined by the state\'s population--has the power to impeach',
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Watergate",
    answer:
      "The events and scandal surrounding a break-in at the Democratic National Committee headquarters in 1972 and the subsequent cover-up of White House involvement, leading to the eventual resignation of President Nixon under the threat of impeachment.",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Marbury V Madison",
    answer:
      "this case establishes the Supreme Court's power of judicial review",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Korematsu v US",
    answer:
      "This supreme court case followed the movement of 100,000 Japanese Americans moved to internment camps; the case upheld the US govt's internment policy as justified in wartime.",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Schenck V US",
    answer:
      '1919; conviction of a socialist who had urged young men to resist the draft during WW1. Justice Holmes declared that gov\'t can limit speech if the speech provokes a "clear and present danger" of substantive evils.',
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Brown V Board of Education",
    answer:
      "1954 - The Supreme Court overruled Plessy v. Ferguson, declared that racially segregated facilities are inherently unequal and ordered all public schools desegregated.",
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Plessy V Ferguson",
    answer:
      'Supreme Court case (1896) Legalized segregation under the Constitution with the concept of "separate but equal."',
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Mapp V Ohio",
    answer:
      'The 1961 Supreme Court decision ruling that the Fourth Amendment\'s protection against "unreasonable searches and seizures" must be extended to the states as well as to the federal government',
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "Miranda V Arizona",
    answer:
      '1966 ruling that upon arrest, a suspect has the "right to remain silent" and the right to consult with a lawyer.',
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },
  {
    question: "NJ v TLO",
    answer:
      'TLO caught smoking in non-designated area, and drug paraphernalia found in possession. The school search is CONSTITUTIONAL as schools only need "reasonable suspicion." *UNREASONABLE SEARCH/SEIZURE CLAIM DENIED',
    correct: null,
    userAnswer: null,
    learnStatus: 0,
  },

]

const McMode = () => {
  return <MultipleChoice card={cards[3]} cardIndex={3} cardData={cards} />;
};

export default McMode;
