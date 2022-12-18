import type { NextApiRequest, NextApiResponse } from 'next'
import * as db from '../../util/db';
import { mongoUri } from '../../util/env';
import Round from '../../models/round';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    await db.connect(mongoUri);

    const rounds = await Round.find().lean();

    return res.status(200).send(rounds);
}
