import axios from 'axios';
import express from 'express';

const PORT: number = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST;

const SERVICE_DISCOVERY_PORT = process.env.SERVICE_DISCOVERY_PORT;
const SERVICE_DISCOVERY_HOST = process.env.SERVICE_DISCOVERY_HOST;

if (!SERVICE_DISCOVERY_PORT || !SERVICE_DISCOVERY_PORT || !SERVICE_DISCOVERY_HOST) {
    console.error("please provide all the environment variables");
    process.exit(1);
}

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`SimpleService started and is listening on port ${PORT}`);
});

app.get('/health', (req, res) => {
    res.status(200).end();
})

const response = axios.post(`http://${SERVICE_DISCOVERY_HOST}:${SERVICE_DISCOVERY_PORT}/services/register`, {
    serviceName: HOST,
    serviceIP: `${HOST}:${PORT}`
}).then(response => {
    if (response.status === 201) {
        console.log("SimpleService registered to ServiceDiscovery");
    }
    else {
        console.log("SimpleService failed to register to ServiceDiscovery");
    }
});