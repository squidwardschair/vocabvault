import Home from "../components/home";
import { GetServerSideProps } from "next";
import prisma from '../lib/prisma'
import { Set } from "@prisma/client";

const shuffle = (array: Set[]) => {
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => { 
      const sets = await prisma.set.findMany({})
      const parsedSets = JSON.parse(JSON.stringify(sets))
      return {
        props: {parsedSets},
      };
    };
  
const Index = ({parsedSets}: {parsedSets: Set[]}) => {
    shuffle(parsedSets)
    let finalSets
    if (parsedSets.length>12) {
        finalSets = parsedSets.slice(0, 11)
    } else {
        finalSets = parsedSets
    }
    return (
        <Home sets={finalSets}/>
    )
}

export default Index