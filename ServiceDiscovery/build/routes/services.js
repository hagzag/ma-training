"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var get_1 = __importDefault(require("./services/get"));
var register_1 = __importDefault(require("./services/register"));
var update_1 = __importDefault(require("./services/update"));
var delete_1 = __importDefault(require("./services/delete"));
var router = express_1.default.Router();
router.use('/lookup', get_1.default);
router.use('/register', register_1.default);
router.use('/update', update_1.default);
router.use('/remove', delete_1.default);
exports.default = router;
