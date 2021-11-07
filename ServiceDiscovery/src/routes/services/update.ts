import express from 'express';
import constants, { getServiceIpsSetKey } from '../../utils/constants';
import { saddAsync, sismemberAsync, sremAsync } from '../../utils/redis-api';

const router = express.Router();

const updateService = async (req: express.Request, res: express.Response) => {

    const { serviceName, oldServiceIP, newServiceIP } = req.body;

    if (!serviceName || !oldServiceIP || !newServiceIP) {
        return res.status(400).end('Please provide service name and old/new ip addresses');
    }

    const knownService: boolean = await sismemberAsync(constants.ServicesSetKeyName, serviceName);

    if (!knownService) {
        return res.status(404).end(`Service '${serviceName}' not found`);
    }

    const serviceIPsSetKey = getServiceIpsSetKey(serviceName);

    const knownIP: boolean = await sismemberAsync(serviceIPsSetKey, oldServiceIP);

    if (!knownIP) {
        return res.status(404).end(`Service '${serviceName}' does not have ip '${oldServiceIP}'`);
    }

    await sremAsync(serviceIPsSetKey, oldServiceIP);

    await saddAsync(serviceIPsSetKey, newServiceIP);

    return res.status(200).end();
}

router.put('/', updateService);

export default router;