import express from 'express';
import constants from '../../utils/constants';
import { hgetallAsync, hgetAsync } from '../../utils/redis-api';

const router = express.Router();

const getAllRegistries = async (req: express.Request, res: express.Response) => {

    const allRegistries = await hgetallAsync(constants.RegistryKeyName);

    res.status(200).json(allRegistries);
}

const getRegistry = async (req: express.Request, res: express.Response) => {

    const key: string = req.params.key;

    if (!key) {
        return res.status(400).end();
    }

    const value = await hgetAsync(constants.RegistryKeyName, key);

    if (!value) {
        return res.status(404).end();
    }

    res.status(200).json({
        key: key,
        value: value
    });
};

router.get('/', getAllRegistries);
router.get('/:key', getRegistry);

export default router;