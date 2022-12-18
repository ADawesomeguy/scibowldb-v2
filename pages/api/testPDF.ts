import axios from 'axios';
import FormData from 'form-data';
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import fs from 'node:fs';
import { parserPath } from '../../util/env';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const form = new multiparty.Form();
    const fData = new FormData();
    // https://stackoverflow.com/questions/62411430/post-multipart-form-data-to-serverless-next-js-api-running-on-vercel-now-sh
    const data = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    });

    // @ts-ignore
    fData.append('file', fs.createReadStream(data.files.file[0].path), 'file');
    
    const axiosRes = await axios.post(parserPath, fData);

    res.status(200).json(axiosRes.data);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
