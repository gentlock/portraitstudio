"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataMgr_1 = require("../middleware/dataMgr");
const configuration = require('../../../../conf/config');
// import dotenv from 'dotenv';
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.dataMgr;
router.put(urls.uploadData + '/:id', dataMgr_1.uploadData);
router.delete(urls.remove + '/:id', dataMgr_1.deleteData);
router.get(urls.setCoverPhoto + '/:id', dataMgr_1.setCoverPhoto);
module.exports = router;
