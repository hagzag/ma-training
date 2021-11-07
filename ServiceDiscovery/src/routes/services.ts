import express from 'express'

import getServiceRoutes from './services/get'
import registerServiceRoutes from './services/register'
import updateServiceRoutes from './services/update'
import deleteServiceRoutes from './services/delete'

const router = express.Router();

router.use('/lookup', getServiceRoutes);
router.use('/register', registerServiceRoutes);
router.use('/update', updateServiceRoutes);
router.use('/remove', deleteServiceRoutes);

export default router;