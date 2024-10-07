import FlashcardHolder from "../../../components/flashcardholder";
import { GetServerSideProps } from "next";
import { Card, Set } from '@prisma/client'
import ConvertCards from "../../../helpers/convert";
import prisma from '../../../lib/prisma'
import { notFound } from 'next/navigation'
import Write from "../../../components/write";

type props = {
    cards: Card[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const cards = await prisma.card.findMany({
      where: {
        setId: Number(params?.id),
      },
    });
    const parsedCards = JSON.parse(JSON.stringify(cards))
    return {
      props: {parsedCards},
    };
  };
  

const WriteMode = ({ parsedCards }: {parsedCards: Card[]}) => {
  if (parsedCards.length==0) {
    notFound()
  }
  console.log(parsedCards)
  let newCards = ConvertCards(parsedCards)
  return <Write cardData={newCards} />;
}

export default WriteMode;
