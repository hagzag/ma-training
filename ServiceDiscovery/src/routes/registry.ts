import express from 'express'

import setRegistryRoutes from './registry/set'
import setMultiRegistryRoutes from './registry/set-multi'
import getRegistryRoutes from './registry/get'
import removeRegistryRoutes from './registry/remove'

const router = express.Router();

router.use('/set', setRegistryRoutes);
router.use('/set-multi', setMultiRegistryRoutes);
router.use('/get', getRegistryRoutes);
router.use('/remove', removeRegistryRoutes);

export default router;