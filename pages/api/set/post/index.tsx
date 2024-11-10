import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next"
import rateLimit from '../../../../helpers/rateLimit';

interface CloudflareTurnstileResponse {
  success: boolean;
  "error-codes": string[];
  challenge_ts: string;
  hostname: string;
}

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 100,
});
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const turnstileRequest = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY!)}&response=${encodeURIComponent(req.body.turnstileToken)}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }
  );

  const turnstileResponse =
  (await turnstileRequest.json()) as CloudflareTurnstileResponse;

  if (!turnstileResponse.success) {
    return res.status(400).json({message: "captha failed"})
  }
  try {
    await limiter.check(res, 10, "CACHE_TOKEN"); // 10 requests per minute
  } catch {
    return res.status(429).json({ message: "Rate limit exceeded" });
  }

  const result = await prisma.set.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      questionLanguage: req.body.questionLanguage,
      answerLanguage: req.body.answerLanguage,
    },
  });
  for (const c of req.body.cards) {
    const newBody = { ...c, setId: result.id, cardToken: ""};
    await prisma.card.create({
      data: {
        question: newBody.question,
        answer: newBody.answer,
        questionLanguage: newBody.questionLanguage,
        answerLanguage: newBody.answerLanguage,
        setId: newBody.setId
      },
    });
  }
  return res.json(result);
}