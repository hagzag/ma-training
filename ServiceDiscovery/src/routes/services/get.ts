import express from 'express';
import constants, { getServiceIpsSetKey } from '../../utils/constants';
import { sismemberAsync, smembersAsync } from '../../utils/redis-api';

const router = express.Router();

const getService = async (req: express.Request, res: express.Response) => {

    const { name: serviceName } = req.params;

    if (!serviceName) {
        return res.status(400).end("Please provide service name");
    }

    const knownService: boolean = await sismemberAsync(constants.ServicesSetKeyName, serviceName);

    if (!knownService) {
        return res.status(404).end(`Service '${serviceName}' not found`);
    }

    const serviceIPs: string[] = await smembersAsync(getServiceIpsSetKey(serviceName));

    return res.status(200).json(serviceIPs);
}

const getAllServices = async (req: express.Request, res: express.Response) => {

    const services: string[] = await smembersAsync(constants.ServicesSetKeyName);

    return res.status(200).json(services);
}

router.get('/', getAllServices);
router.get('/:name', getService);

export default router;