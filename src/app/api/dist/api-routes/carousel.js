"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const carousel_1 = require("../middleware/carousel");
const configuration = require('../../../../conf/config');
// import dotenv from 'dotenv';
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.carousel;
router.get(urls.getAll, carousel_1.db_fetch_all);
router.get(urls.getById + '/:id', carousel_1.db_fetch_by_id);
router.post(urls.addNew, carousel_1.db_add_new);
router.put(urls.update + '/:id', carousel_1.db_update);
router.delete(urls.remove + '/:id', carousel_1.db_delete);
module.exports = router;
