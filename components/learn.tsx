import MultipleChoice from "./multiplechoice";
import LearnWrite from "./learnwrite";
import { Card } from "../types/index";
import { useState, useEffect, useRef, RefObject } from "react";
import LearnProgress from "./learnprogress";
import styles from "../styles/write.module.css";
import LearnRecap from "./learnrecap";
type dispatchProps = {
  card: Card;
  doneStatus(status: boolean | null): void;
  cardCorrect(correct: boolean | null): void;
  isRecap: boolean | null;
  setRecap(recap: boolean | null): void;
  cardIndex: number;
  cardData: Card[];
  dispatchDone: boolean | null;
};

const shuffle = (array: Card[]) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};
const DispatchLearn = ({
  card,
  doneStatus,
  cardCorrect,
  isRecap,
  setRecap,
  cardIndex,
  cardData,
  dispatchDone,
}: dispatchProps) => {
  if (isRecap) {
    return <LearnRecap cards={cardData} setRecap={setRecap} />;
  } else if (card.learnStatus > 2) {
    return (
      <LearnWrite
        cardData={[card]}
        learnStateFunc={doneStatus}
        learnCorrectFunc={cardCorrect}
        key={card.id}
      />
    );
  } else {
    return (
      <MultipleChoice
        card={card}
        cardData={cardData}
        cardIndex={cardIndex}
        learnCorrectFunc={cardCorrect}
        learnStateFunc={doneStatus}
      />
    );
  }
};
const Learn = ({ cards }: { cards: Card[] }) => {
  const [learnCards, setLearnCards] = useState<Card[]>(cards);
  const [filteredCards, setFilteredCards] = useState<Card[][]>([]);
  const [isRecap, setRecap] = useState<boolean | null>(false);
  const [curCardCorrect, cardCorrect] = useState<boolean | null>(null);
  const [dispatchDone, doneStatus] = useState<boolean | null>(null);
  const [curPool, setCurPool] = useState<Card[]>(cards.slice(0, 9));
  const [curPoolIndex, setPoolIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(8);
  const [tester, setTest] = useState<Card[]>();

  useEffect(() => {
    if (dispatchDone == null || dispatchDone == false) {
      return;
    }
    let curCard = curPool[curPoolIndex];
    if (curCardCorrect) {
      if (curCard.learnStatus == 0 || curCard.learnStatus == 1) {
        curCard.learnStatus = 4;
      } else if (curCard.learnStatus == 2) {
        curCard.learnStatus = 1;
      } else if (
        curCard.learnStatus == 3 ||
        curCard.learnStatus == 4 ||
        curCard.learnStatus == 5
      ) {
        curCard.learnStatus += 1;
      } else if (curCard.learnStatus == 6) {
        curCard.learnStatus = 6;
      }
    } else {
      if (
        curCard.learnStatus == 0 ||
        curCard.learnStatus == 2 ||
        curCard.learnStatus == 3
      ) {
        curCard.learnStatus = 1;
      } else if (curCard.learnStatus == 1) {
        curCard.learnStatus = 2;
      } else if (
        curCard.learnStatus == 4 ||
        curCard.learnStatus == 5 ||
        curCard.learnStatus == 6
      ) {
        curCard.learnStatus -= 1;
      }
    }
    if (curPoolIndex == maxIndex) {
      setRecap(true);
      filterCards();
      setPoolIndex(0);
      cardCorrect(null);
      setMaxIndex(curPool.length - 1);
      doneStatus(false);

    } else {
      doneStatus(false);
      setPoolIndex(curPoolIndex + 1);
      cardCorrect(null);
    }
  }, [dispatchDone]);

  useEffect(() => {
    if (isRecap) {
      let randomCards = [
        filteredCards[0],
        filteredCards[2],
        filteredCards[3],
      ].flat();
      setTest(filteredCards[0])
      shuffle(randomCards);
      let orderPriority = [filteredCards[1], randomCards].flat();
      if (orderPriority.length < 12) {
        setCurPool(orderPriority);
      } else {
        setCurPool(orderPriority.slice(0,9));
      }
    }

  }, [filteredCards])

  const filterCards = () => {
    let newCards = learnCards.filter((card) => {
      return card.learnStatus == 0;
    });
    let priorityCards = learnCards.filter((card) => {
      return card.learnStatus == 1 || card.learnStatus == 2;
    });
    let finalLearnCards = learnCards.filter((card) => {
      return card.learnStatus == 3 || card.learnStatus == 4;
    });
    let masteredCards = learnCards.filter((card) => {
      return card.learnStatus == 5 || card.learnStatus == 6;
    });
    setFilteredCards([newCards, priorityCards, finalLearnCards, masteredCards]);
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.learnHolder}>
        <DispatchLearn
          card={curPool[curPoolIndex]}
          doneStatus={doneStatus}
          cardCorrect={cardCorrect}
          isRecap={isRecap}
          setRecap={setRecap}
          cardIndex={
            cards.findIndex((card) => card.id == curPool[curPoolIndex].id)
              
          }
          cardData={cards}
          dispatchDone={dispatchDone}
        />
        <LearnProgress cards={cards} />
      </div>
    </div>
  );
};

export default Learn;
