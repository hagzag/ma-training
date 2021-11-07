"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_api_1 = require("./utils/redis-api");
var constants_1 = __importStar(require("./utils/constants"));
var axios_1 = __importDefault(require("axios"));
var healthCheck = function () { return __awaiter(void 0, void 0, void 0, function () {
    var services;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("starting health check..");
                return [4 /*yield*/, (0, redis_api_1.smembersAsync)(constants_1.default.ServicesSetKeyName)];
            case 1:
                services = _a.sent();
                services.forEach(function (serviceName) { return __awaiter(void 0, void 0, void 0, function () {
                    var serviceIPs, serviceIPsKeyName, deletedIps;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, redis_api_1.smembersAsync)((0, constants_1.getServiceIpsSetKey)(serviceName))];
                            case 1:
                                serviceIPs = _a.sent();
                                serviceIPsKeyName = (0, constants_1.getServiceIpsSetKey)(serviceName);
                                if (!(serviceIPs.length == 0)) return [3 /*break*/, 3];
                                return [4 /*yield*/, (0, redis_api_1.delAsync)(serviceIPsKeyName)];
                            case 2: return [2 /*return*/, _a.sent()];
                            case 3:
                                deletedIps = 0;
                                return [4 /*yield*/, Promise.all(serviceIPs.map(function (serviceIP) { return __awaiter(void 0, void 0, void 0, function () {
                                        var response, err_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 4, , 6]);
                                                    return [4 /*yield*/, axios_1.default.get("http://" + serviceIP + "/health")];
                                                case 1:
                                                    response = _a.sent();
                                                    if (!(response.status !== 200)) return [3 /*break*/, 3];
                                                    console.log("health check: ", "deleted", serviceIP, "from", serviceName);
                                                    return [4 /*yield*/, (0, redis_api_1.sremAsync)(serviceIPsKeyName, serviceIP)];
                                                case 2:
                                                    _a.sent();
                                                    deletedIps++;
                                                    _a.label = 3;
                                                case 3: return [3 /*break*/, 6];
                                                case 4:
                                                    err_1 = _a.sent();
                                                    console.log("health check: ", "deleted", serviceIP, "from", serviceName);
                                                    return [4 /*yield*/, (0, redis_api_1.sremAsync)(serviceIPsKeyName, serviceIP)];
                                                case 5:
                                                    _a.sent();
                                                    deletedIps++;
                                                    return [3 /*break*/, 6];
                                                case 6: return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                            case 4:
                                _a.sent();
                                if (!(deletedIps === serviceIPs.length)) return [3 /*break*/, 6];
                                console.log("deleting service ", serviceName);
                                return [4 /*yield*/, (0, redis_api_1.sremAsync)(constants_1.default.ServicesSetKeyName, serviceName)];
                            case 5:
                                _a.sent();
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
//setInterval(healthCheck, constants.healthCheckIntervalInMinutes * 60 * 1000)
