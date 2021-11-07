"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceIpsSetKey = void 0;
var constants = {
    ServicesSetKeyName: "all-users",
    RegistryKeyName: "all-registry",
    ServiceIpsKeyPrefix: "service-ips",
    healthCheckIntervalInMinutes: 3
};
var getServiceIpsSetKey = function (serviceName) { return constants.ServiceIpsKeyPrefix + "-" + serviceName; };
exports.getServiceIpsSetKey = getServiceIpsSetKey;
exports.default = constants;
