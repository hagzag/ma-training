"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var registerService = function (req, res) {
};
var updateService = function (req, res) {
};
var removeService = function (req, res) {
};
var getService = function (req, res) {
};
router.post('/', registerService);
router.put('/', updateService);
router.delete('/', removeService);
router.get('/', getService);
exports.default = router;
