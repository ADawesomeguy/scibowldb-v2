import axios from 'axios';
import FormData from 'form-data';
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import fs from 'node:fs';
import Question from '../../models/question';
import Round from '../../models/round';
import * as db from '../../util/db';
import { mongoUri, parserPath } from '../../util/env';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') return res.status(405);
    const token = await getToken({ req });
    if (!token) return res.status(401).send("You must be signed in to upload a round");

    db.connect(mongoUri);

    const form = new multiparty.Form();
    const fData = new FormData();
    // https://stackoverflow.com/questions/62411430/post-multipart-form-data-to-serverless-next-js-api-running-on-vercel-now-sh
    const body : any = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    });

    // @ts-ignore
    fData.append('file', fs.createReadStream(body.files.file[0].path), 'file');

    const axiosRes = await axios.post(parserPath, fData, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });
    const round = axiosRes.data;

    let questions = [];
    for (let i = 0; i < round.length; i++) {
        const TUQ = new Question({
            type: "TOSS-UP",
            format: round[i].tossupFormat,// == 'Short Answer' ? QuestionFormat.SHORT_ANSWER : QuestionFormat.MULTIPLE_CHOICE,
            category: round[i].category,
            question: round[i].tossupQuestion,
            answer: round[i].tossupAnswer,
            tossUp: null,
            bonus: null,
            submitter: token.email,
            source: body.fields.source[0] || '', // todo: figure out how to have them input source when
                                              // req.body is not parsed
        })
        
        const BQ = new Question({
            type: "BONUS",
            format: round[i].tossupFormat,// == 'Short Answer' ? QuestionFormat.SHORT_ANSWER : QuestionFormat.MULTIPLE_CHOICE,
            category: round[i].category,
            question: round[i].bonusQuestion,
            answer: round[i].bonusAnswer,
            tossUp: null,
            bonus: null,
            submitter: token.email,
            source: body.fields.source[0],
        })
        questions.push(TUQ);
        questions.push(BQ);
        TUQ.tossUp = TUQ._id;
        TUQ.bonus = BQ._id;
        BQ.tossUp = TUQ._id;
        BQ.bonus = BQ._id;
    }
    const dbRound = new Round({
        questions: questions,
        submitter: token.email,
        source: body.fields.source[0] || '',
    });
    await dbRound.save();

    db.disconnect();

    res.redirect(307, '/rounds');
}

export const config = {
    api: {
        bodyParser: false,
    },
};
