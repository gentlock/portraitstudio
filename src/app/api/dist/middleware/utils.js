"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remDir = exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
const configuration = require('../../../../conf/config');
function createDir(id, next) {
    try {
        fs_1.default.mkdirSync(configuration.folders.uploadDir.path + "/" + id);
    }
    catch (err) {
        next(err);
    }
}
exports.createDir = createDir;
function remDir(id) {
    try {
        fs_1.default.rmdirSync(configuration.folders.uploadDir.path + "/" + id);
    }
    catch (err) {
        return err;
    }
}
exports.remDir = remDir;
