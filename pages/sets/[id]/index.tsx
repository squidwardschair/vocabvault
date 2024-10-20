import SetHome from "../../../components/sethome";
import { GetServerSideProps } from "next";
import { Card, Set } from '@prisma/client'
import ConvertCards from "../../../helpers/convert";
import prisma from '../../../lib/prisma'
import NotFound from "../../../components/notfound";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof(params?.id)==="string") {
    if (/^-?\d+$/.test(params.id) == false) {
      return {
        props: {
          parsedCards: []
        }
      }
    }
  }
    const cards = await prisma.card.findMany({
      where: {
        setId: Number(params?.id),
      },
    });

    const set = await prisma.set.findFirst({
      where: {
        id: Number(params?.id)
      }
    })
    const parsedCards = JSON.parse(JSON.stringify(cards))
    const parsedSets = JSON.parse(JSON.stringify(set))
    return {
      props: {parsedCards, parsedSets},
    };
  };
  

function App({ parsedCards, parsedSets }: {parsedCards: Card[], parsedSets: Set}) {
  if (parsedCards.length==0) {
    return (
      <NotFound></NotFound>
    )
  }
  console.log(parsedCards)
  let newCards = ConvertCards(parsedCards)
  return <SetHome name={parsedSets.name} desc={parsedSets.description} cardData={newCards} />;
}

export default App;
