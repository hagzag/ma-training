"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sismemberAsync = exports.delAsync = exports.sremAsync = exports.saddAsync = exports.setWithExpirationAsync = exports.smembersAsync = exports.hdelAsync = exports.hsetAsync = exports.getAsync = exports.setAsync = exports.hgetAsync = exports.hgetallAsync = void 0;
var ioredis_1 = __importDefault(require("ioredis"));
var util_1 = require("util");
var client = new ioredis_1.default(Number(process.env.REDIS_PORT) || 6379, process.env.REDIS_HOST || '127.0.0.1');
client.on("error", function (error) {
    console.error("redis error: ", error);
});
exports.hgetallAsync = (0, util_1.promisify)(client.hgetall).bind(client);
var hgetAsync = function (key, field) { return client.hget(key, field); };
exports.hgetAsync = hgetAsync;
exports.setAsync = (0, util_1.promisify)(client.set).bind(client);
exports.getAsync = (0, util_1.promisify)(client.get).bind(client);
var hsetAsync = function (key, values) { return client.hset(key, values); };
exports.hsetAsync = hsetAsync;
var hdelAsync = function (key, field) {
    return client.hdel(key, field).then(function (number) { return number > 0; });
};
exports.hdelAsync = hdelAsync;
var smembersAsync = function (key) { return new Promise(function (resolve, reject) {
    client.smembers(key, function (err, result) {
        if (err) {
            console.log("error is", err);
            reject(err);
            return;
        }
        resolve(result);
    });
}); };
exports.smembersAsync = smembersAsync;
var setWithExpirationAsync = function (key, value, timeInMinutes) { return new Promise(function (resolve, reject) {
    client.set(key, value, 'EX', timeInMinutes * 60, function (err, result) {
        if (err) {
            reject(err);
            return;
        }
        resolve(result);
    });
}); };
exports.setWithExpirationAsync = setWithExpirationAsync;
var saddAsync = function (key, value) { return new Promise(function (resolve, reject) {
    client.sadd(key, value, function (err, result) {
        if (err) {
            reject(err);
            return;
        }
        resolve(result);
    });
}); };
exports.saddAsync = saddAsync;
var sremAsync = function (key, value) { return new Promise(function (resolve, reject) {
    client.srem(key, value, function (err, result) {
        if (err || result === 0) {
            reject(err);
            return;
        }
        resolve(result);
    });
}); };
exports.sremAsync = sremAsync;
var delAsync = function (key) { return new Promise(function (resolve, reject) {
    client.del(key, function (err, result) {
        if (err) {
            reject(err);
            return;
        }
        resolve(result);
    });
}); };
exports.delAsync = delAsync;
var sismemberAsync = function (key, member) { return new Promise(function (resolve, reject) {
    client.sismember(key, member, function (err, result) {
        if (err) {
            return reject(err);
        }
        resolve(result === 1);
    });
}); };
exports.sismemberAsync = sismemberAsync;
