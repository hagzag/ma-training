import express from 'express';
import constants, { getServiceIpsSetKey } from '../../utils/constants';
import { sismemberAsync, sremAsync } from '../../utils/redis-api';

const router = express.Router();

const deleteService = async (req: express.Request, res: express.Response) => {

    const { serviceName, serviceIP } = req.body;

    if (!serviceName || !serviceIP) {
        return res.status(400).end('Please provide service name and ip address');
    }

    const knownService: boolean = await sismemberAsync(constants.ServicesSetKeyName, serviceName);

    if (!knownService) {
        return res.status(404).end(`Service '${serviceName}' not found`);
    }

    const serviceIPsSetKey = getServiceIpsSetKey(serviceName);

    const knownIP: boolean = await sismemberAsync(serviceIPsSetKey, serviceIP);

    if (!knownIP) {
        return res.status(404).end(`Service '${serviceName}' does not have ip '${serviceIP}'`);
    }

    await sremAsync(serviceIPsSetKey, serviceIP);

    return res.status(200).end();
}

router.delete('/', deleteService);

export default router;