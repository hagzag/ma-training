import express from 'express';
import constants, { getServiceIpsSetKey } from '../../utils/constants';
import { saddAsync, sismemberAsync } from '../../utils/redis-api';

const router = express.Router();

const registerService = async (req: express.Request, res: express.Response) => {

    const { serviceName, serviceIP } = req.body;

    if (!serviceName || !serviceIP) {
        return res.status(400).end('Please provide service name and ip address');
    }

    await saddAsync(constants.ServicesSetKeyName, serviceName);

    await saddAsync(getServiceIpsSetKey(serviceName), serviceIP);

    return res.status(201).end();
}

router.post('/', registerService);

export default router;