"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var services_1 = __importDefault(require("./routes/services"));
var registry_1 = __importDefault(require("./routes/registry"));
require("./utils/healthcheck");
var app = (0, express_1.default)();
var port = Number(process.env.PORT) || 3000;
app.use(express_1.default.json());
app.use('/services', services_1.default);
app.use('/registry', registry_1.default);
app.listen(port, function () {
    console.log("ServiceDiscovery started and is listening on port " + port);
});
