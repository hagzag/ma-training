import express from 'express';
import { isArray } from 'util';
import constants from '../../utils/constants';
import { hsetAsync } from '../../utils/redis-api';

const router = express.Router();

const insertMultiRegistry = async (req: express.Request, res: express.Response) => {

    const parsedBody: string[] | undefined = parseRequestBody(req.body);

    if (!parsedBody) {
        return res.status(400).end();
    }

    await hsetAsync(constants.RegistryKeyName, parsedBody);

    res.status(201).end();
}


const parseRequestBody = (body: any): string[] | undefined => {

    if (!Array.isArray(body)) {
        return;
    }

    let parsedBody: string[] = [];

    for (let i = 0; i < body.length; i++) {
        const { key, value } = body[i];

        if (!key || !value) {
            return;
        }

        parsedBody.push(String(key), String(value));
    }

    return parsedBody;
}

router.post('/', insertMultiRegistry);

export default router;