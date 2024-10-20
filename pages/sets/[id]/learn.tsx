import Learn from "../../../components/learn";
import { GetServerSideProps } from "next";
import { Card, Set } from '@prisma/client'
import ConvertCards from "../../../helpers/convert";
import prisma from '../../../lib/prisma'
import NotFound from "../../../components/notfound";

type props = {
  posts: Card[];
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

const LearnMode = ({ parsedCards }: {parsedCards: Card[]}) => {
  if (parsedCards.length==0) {
    return (
      <NotFound></NotFound>
    )  }
  let newCards = ConvertCards(parsedCards)
  return <Learn cards={newCards} />;
};

export default LearnMode;
