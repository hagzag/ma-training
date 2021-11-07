import express from 'express';
import constants from '../../utils/constants';
import { hdelAsync } from '../../utils/redis-api';

const router = express.Router();

const removeKey = async (req: express.Request, res: express.Response) => {

    const key: string = req.params.key;

    if (!key) {
        return res.status(400).end();
    }

    const keyExists: boolean = await hdelAsync(constants.RegistryKeyName, key);

    if (!keyExists) {
        return res.status(404).end();
    }

    res.status(200).end();
}

router.delete('/:key', removeKey);

export default router;