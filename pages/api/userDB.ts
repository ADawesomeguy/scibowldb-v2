import axios from 'axios';
import FormData from 'form-data';
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import fs from 'node:fs';
import { mongoUri, parserPath } from '../../util/env';
import * as db from '../../util/db';
import User from '../../models/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    db.connect(mongoUri);

    //User.countDocuments({ _id:  })

    res.redirect('/');
}
