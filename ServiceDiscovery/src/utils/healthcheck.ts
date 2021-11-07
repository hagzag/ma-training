import { smembersAsync, sremAsync } from "./redis-api"
import constants, { getServiceIpsSetKey } from "./constants"
import axios from 'axios';

const healthCheck = async () => {

    const services: string[] = await smembersAsync(constants.ServicesSetKeyName);

    services.forEach(async (serviceName: string) => {

        const serviceIPs: string[] = await smembersAsync(getServiceIpsSetKey(serviceName));

        const serviceIPsKeyName: string = getServiceIpsSetKey(serviceName);

        let deletedIps: number = 0;

        await Promise.all(serviceIPs.map(async (serviceIP: string) => {

            try {
                const response = await axios.get(`http://${serviceIP}/health`);

                if (response.status !== 200) {

                    await sremAsync(serviceIPsKeyName, serviceIP);
                    deletedIps++;
                }
            }
            catch (err) {
                
                await sremAsync(serviceIPsKeyName, serviceIP);

                deletedIps++;
            }
        }));

        if (deletedIps === serviceIPs.length)
        {
            await sremAsync(constants.ServicesSetKeyName, serviceName);
        }
    });
};

setInterval(healthCheck, 1000 * 60 * constants.healthCheckIntervalInMinutes)