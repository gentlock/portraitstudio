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
const configuration = require('../../../../conf/config');
// import dotenv from 'dotenv';
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.albums;
router.get(urls.getAll, db_fetch_all);
router.get(urls.getById + '/:id', db_fetch_by_id);
router.post(urls.addNew, db_add_new);
router.put(urls.update + '/:id', db_update);
router.put(urls.uploadPhoto + '/:id', uploadPhoto);
router.delete(urls.remove + '/:id', db_delete);
function db_fetch_all(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield schemas_1.albumsSchema.find({})
            .then(result => res.json({ result }))
            .catch(error => {
            res.json({ error });
        });
    });
}
function db_fetch_by_id(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        yield schemas_1.albumsSchema.findById(id)
            .then(result => res.json({ result }))
            .catch(error => res.json({ error }));
    });
}
function db_add_new(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield schemas_1.albumsSchema.create({
            'isActive': req.body.isActive || false,
            "addDate": Date.now(),
            'name': req.body.name,
            'clientName': req.body.clientName,
            'clientEmail': req.body.clientEmail,
            'coverPhoto': "",
            'accessCode': req.body.accessCode,
            'serviceId': req.body.serviceId,
            'clientInfo': req.body.clientInfo,
            'desc': req.body.desc,
            'fileToDownload': "",
            'gallery': "",
        })
            .then(result => { res.json({ result }); })
            .catch(error => res.json({ error }));
    });
}
function db_update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        yield schemas_1.albumsSchema.findByIdAndUpdate(id, {
            'isActive': req.body.isActive,
            'name': req.body.name,
            'clientName': req.body.clientName,
            'clientEmail': req.body.clientEmail,
            'accessCode': req.body.accessCode,
            'serviceId': req.body.serviceId,
            'clientInfo': req.body.clientInfo,
            'desc': req.body.desc,
        })
            .then(result => res.json({ result }))
            .catch(error => res.json({ error }));
    });
}
function uploadPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let uniqId = req.params.id;
    });
}
function db_delete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        if (id) {
            yield schemas_1.albumsSchema.findByIdAndDelete(id)
                .then(result => res.json({ result }))
                .catch(error => res.json({ error }));
        }
    });
}
module.exports = router;
