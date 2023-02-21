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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadData = exports.fetchGallery = exports.deleteData = exports.setCoverPhoto = void 0;
// import * as fs from "fs";
const configuration = require('../../../../conf/config');
const schemas_1 = require("../schemas");
const schemas_2 = require("../schemas");
function setCoverPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.setCoverPhoto = setCoverPhoto;
function deleteData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.deleteData = deleteData;
function fetchGallery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let useSchema = req.params.useSchema;
        if (useSchema === 'albumsSchema') {
            yield schemas_1.albumsSchema.findById({ id });
        }
        else if (useSchema === 'myservicesSchema') {
            yield schemas_2.myservicesSchema.findById({ id });
        }
    });
}
exports.fetchGallery = fetchGallery;
function uploadData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let useSchema = req.params.useSchema;
        let data = req.files;
        let fileslist = [];
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        else {
            Object.values(data.file).forEach(item => {
                let file = item;
                let uploadPath = configuration.uploadDir.pathAdress + `/${id}/` + file.name;
                file.mv(uploadPath, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (!err) {
                        if (useSchema === 'albumsSchema') {
                            yield schemas_1.albumsSchema.findByIdAndUpdate(id, { $push: { 'gallery': file.name } });
                        }
                        else if (useSchema === 'myservicesSchema') {
                            yield schemas_2.myservicesSchema.findByIdAndUpdate(id, { $push: { 'gallery': file.name } });
                        }
                    }
                }));
            });
        }
    });
}
exports.uploadData = uploadData;
