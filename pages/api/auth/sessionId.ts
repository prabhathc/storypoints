import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from "uuid";

type Data = {
  name: string
}

// TODO: Make this much more secure and find a safe place to store.
// As of now it is plain text and not stored anywhere. Need DB?

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sessionId = v4();
  res.status(200).json({ sessionId });
}