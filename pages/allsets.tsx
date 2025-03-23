import AllSets from "../components/allsets";
import { GetServerSideProps } from "next";
import prisma from '../lib/prisma'
import { Set } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async ({ params }) => { 
    const sets = await prisma.set.findMany({})
    const parsedSets = JSON.parse(JSON.stringify(sets))
    return {
      props: {parsedSets},
    };
  };

const GetSets = ({parsedSets}: {parsedSets: Set[]}) => {
    return (
        <AllSets sets={parsedSets}/>
    )
}

export default GetSets