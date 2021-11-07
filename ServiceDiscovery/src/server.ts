import express from 'express';
import servicesRoutes from './routes/services';
import registryRoutes from './routes/registry'

import './utils/healthcheck'

const app = express();
const port : number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use('/services', servicesRoutes);
app.use('/registry', registryRoutes);

app.listen(port, () => {
    console.log(`ServiceDiscovery started and is listening on port ${port}`);
});