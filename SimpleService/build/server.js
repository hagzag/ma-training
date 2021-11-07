"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var PORT = Number(process.env.PORT) || 3000;
var HOST = process.env.HOST;
var SERVICE_DISCOVERY_PORT = process.env.SERVICE_DISCOVERY_PORT;
var SERVICE_DISCOVERY_HOST = process.env.SERVICE_DISCOVERY_HOST;
if (!SERVICE_DISCOVERY_PORT || !SERVICE_DISCOVERY_PORT || !SERVICE_DISCOVERY_HOST) {
    console.error("please provide all the environment variables");
    process.exit(1);
}
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(PORT, function () {
    console.log("SimpleService started and is listening on port " + PORT);
});
app.get('/health', function (req, res) {
    res.status(200).end();
});
var response = axios_1.default.post("http://" + SERVICE_DISCOVERY_HOST + ":" + SERVICE_DISCOVERY_PORT + "/services/register", {
    serviceName: HOST,
    serviceIP: HOST + ":" + PORT
}).then(function (response) {
    if (response.status === 201) {
        console.log("SimpleService registered to ServiceDiscovery");
    }
    else {
        console.log("SimpleService failed to register to ServiceDiscovery");
    }
});
