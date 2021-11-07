"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var set_1 = __importDefault(require("./set"));
var set_multi_1 = __importDefault(require("./set-multi"));
var get_1 = __importDefault(require("./get"));
var remove_1 = __importDefault(require("./remove"));
var router = express_1.default.Router();
router.use('/set', set_1.default);
router.use('/set-multi', set_multi_1.default);
router.use('/get', get_1.default);
router.use('/remove', remove_1.default);
exports.default = router;
