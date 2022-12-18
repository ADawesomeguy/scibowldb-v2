import type { NextApiRequest, NextApiResponse } from 'next';
import Round from '../../models/round';
import * as db from '../../util/db';
import { mongoUri } from '../../util/env';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await db.connect(mongoUri);
    const ret = await Round.find().lean();
    
    res.json(ret);
}