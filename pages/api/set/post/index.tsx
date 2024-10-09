import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next"
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });
  const result = await prisma.set.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      questionLanguage: req.body.questionLanguage,
      answerLanguage: req.body.answerLanguage,
    },
  });
  res.json(result);
}