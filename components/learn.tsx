import MultipleChoice from "./multiplechoice";
import LearnWrite from "./learnwrite";
import { ClientCard } from "../types/index";
import { Card, Set } from '@prisma/client'
import { useState, useEffect } from "react";
import LearnProgress from "./learnprogress";
import styles from "../styles/write.module.css";
import LearnRecap from "./learnrecap";
import LearnFinal from "./learnfinalrecap";

type dispatchProps = {
  card: ClientCard;
  doneStatus(status: boolean | null): void;
  cardCorrect(correct: boolean | null): void;
  isRecap: boolean | null;
  setRecap(recap: boolean | null): void;
  cardIndex: number;
  cardData: ClientCard[];
  isFinished: boolean;
};

const shuffle = (array: ClientCard[]) => {
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
  isFinished,
}: dispatchProps) => {
  if (isRecap) {
    if (isFinished) {
      return <LearnFinal cards={cardData} />;
    } else {
      return <LearnRecap cards={cardData} setRecap={setRecap} />;
    }
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
const Learn = ({ cards }: { cards: ClientCard[] }) => {
  const [learnCards, setLearnClientCards] = useState<ClientCard[]>(cards);
  const [filteredClientCards, setFilteredClientCards] = useState<ClientCard[][]>([]);
  const [isRecap, setRecap] = useState<boolean | null>(false);
  const [curClientCardCorrect, cardCorrect] = useState<boolean | null>(null);
  const [dispatchDone, doneStatus] = useState<boolean | null>(null);
  const [curPool, setCurPool] = useState<ClientCard[]>(learnCards.slice(0, 9));
  const [curPoolIndex, setPoolIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(8);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    if (dispatchDone == null || dispatchDone == false) {
      return;
    }
    let curClientCard = curPool[curPoolIndex];
    if (curClientCardCorrect) {
      if (curClientCard.learnStatus == 0 || curClientCard.learnStatus == 1) {
        curClientCard.learnStatus = 4;
        curClientCard.learnRecaps[2] += 1;
      } else if (curClientCard.learnStatus == 2) {
        curClientCard.learnStatus = 1;
        curClientCard.learnRecaps[1] += 1;
      } else if (
        curClientCard.learnStatus == 3 ||
        curClientCard.learnStatus == 4 ||
        curClientCard.learnStatus == 5
      ) {
        curClientCard.learnRecaps[2] += 1;
        curClientCard.learnStatus += 1;
      } else if (curClientCard.learnStatus == 6) {
        curClientCard.learnStatus = 6;
      }
    } else {
      if (
        curClientCard.learnStatus == 0 ||
        curClientCard.learnStatus == 2 ||
        curClientCard.learnStatus == 3
      ) {
        curClientCard.learnRecaps[0] += 1;
        curClientCard.learnStatus = 1;
      } else if (curClientCard.learnStatus == 1) {
        curClientCard.learnRecaps[0] += 1;
        curClientCard.learnStatus = 2;
      } else if (
        curClientCard.learnStatus == 4 ||
        curClientCard.learnStatus == 5 ||
        curClientCard.learnStatus == 6
      ) {
        curClientCard.learnRecaps[1] += 1;
        curClientCard.learnStatus -= 1;
      }
    }
    if (curPoolIndex == maxIndex) {
      let notMastered = learnCards.filter((card) => {
        return card.learnStatus < 6;
      });
      if (notMastered.length == 0) {
        setFinished(true);
        setRecap(true);
      } else {
        setRecap(true);
        filterClientCards();
        setPoolIndex(0);
        cardCorrect(null);
        doneStatus(false);
      }
    } else {
      doneStatus(false);
      setPoolIndex(curPoolIndex + 1);
      cardCorrect(null);
    }
  }, [dispatchDone]);

  useEffect(() => {
    if (isRecap) {
      let randomClientCards = [
        filteredClientCards[0],
        filteredClientCards[2],
        filteredClientCards[3],
      ].flat();
      shuffle(randomClientCards);
      let orderPriority = [filteredClientCards[1], randomClientCards].flat();
      let newPool
      if (orderPriority.length < 12) {
        newPool=orderPriority
        setCurPool(newPool);
      } else {
        newPool=orderPriority.slice(0, 9)
        setCurPool(newPool);
      }
      setMaxIndex(newPool.length-1)
    }
  }, [filteredClientCards]);

  const filterClientCards = () => {
    let newClientCards = learnCards.filter((card) => {
      return card.learnStatus == 0;
    });
    let priorityClientCards = learnCards.filter((card) => {
      return card.learnStatus == 1 || card.learnStatus == 2;
    });
    let finalLearnClientCards = learnCards.filter((card) => {
      return card.learnStatus == 3 || card.learnStatus == 4;
    });
    let masteredClientCards = learnCards.filter((card) => {
      return card.learnStatus == 5;
    });
    setFilteredClientCards([newClientCards, priorityClientCards, finalLearnClientCards, masteredClientCards]);
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
          cardIndex={cards.findIndex(
            (card) => card.id == curPool[curPoolIndex].id
          )}
          cardData={cards}
          isFinished={finished}
        />
        <LearnProgress cards={cards} />
      </div>
    </div>
  );
};

export default Learn;
