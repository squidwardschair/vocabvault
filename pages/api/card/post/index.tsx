import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next"

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const result = await prisma.card.create({
    data: {
      question: req.body.question,
      answer: req.body.answer,
      questionLanguage: req.body.questionLanguage,
      answerLanguage: req.body.answerLanguage,
      setId: req.body.setId
    },
  });
  res.json(result);
}