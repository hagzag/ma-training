import express from 'express';
import constants from '../../utils/constants';
import { hsetAsync } from '../../utils/redis-api';

const router = express.Router();

const insertRegistry = async (req: express.Request, res: express.Response) => {
    
    const { key, value } = req.body;

    if (!key || !value) {
        return res.status(400).end();
    }

    await hsetAsync(constants.RegistryKeyName, [key, value]);

    res.status(201).end();
}

router.post('/', insertRegistry);

export default router;