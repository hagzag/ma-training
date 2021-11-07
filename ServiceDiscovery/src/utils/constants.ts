const constants = {
    ServicesSetKeyName : "all-users",
    RegistryKeyName: "all-registry",
    ServiceIpsKeyPrefix: "service-ips",
    healthCheckIntervalInMinutes : 3
}

export const getServiceIpsSetKey = (serviceName : string) => `${constants.ServiceIpsKeyPrefix}-${serviceName}`

export default constants;