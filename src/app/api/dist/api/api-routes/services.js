"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const responseHandler_1 = require("../responseHandler");
const resHandler = new responseHandler_1.responseHandler;
const configuration = require('../../../../../conf/config');
// import dotenv from 'dotenv';
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.myservices;
router.get(urls.getAll, getAll);
router.get(urls.getById + '/:id', getById);
router.post(urls.addNew, addNew);
router.put(urls.update + '/:id', update);
router.put(urls.uploadPhoto + '/:id', uploadPhoto);
router.delete(urls.remove + '/:id', remove);
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield schemas_1.myservicesSchema.find({})
            .then(result => res.json(resHandler.sendRaw(result)))
            .catch(error => {
            res.json(resHandler.failure(error));
        });
    });
}
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        yield schemas_1.myservicesSchema.findById(id)
            .then(result => res.json(resHandler.sendRaw(result)))
            .catch(error => res.json(resHandler.failure(error)));
    });
}
function addNew(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield schemas_1.myservicesSchema.create({
            'isActive': req.body.isActive || false,
            "addDate": Date.now(),
            'name': req.body.name,
            'desc': req.body.desc,
            'subtitle': req.body.subtitle,
            "priceList": req.body.priceList,
            "gallery": "",
            'coverPhoto': "",
        })
            .then(result => { res.json(resHandler.sendRaw(result)); })
            .catch(error => res.json(resHandler.failure(error)));
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        yield schemas_1.myservicesSchema.findByIdAndUpdate(id, {
            'isActive': req.body.isActive,
            'name': req.body.name,
            'desc': req.body.desc,
            'subtitle': req.body.subtitle,
            "priceList": req.body.priceList,
        })
            .then(result => res.json(resHandler.sendRaw(result)))
            .catch(error => res.json(resHandler.failure(error)));
    });
}
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        if (id) {
            yield schemas_1.myservicesSchema.findByIdAndDelete(id)
                .then(result => res.json(resHandler.sendRaw(result)))
                .catch(error => res.json(resHandler.failure(error)));
        }
    });
}
function uploadPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let uniqId = req.params.id;
    });
}
module.exports = router;
