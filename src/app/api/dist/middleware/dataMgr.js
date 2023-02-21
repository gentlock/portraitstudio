"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.uploadData = exports.deleteData = exports.setCoverPhoto = exports.remDir = exports.createDir = void 0;
const fs = __importStar(require("fs"));
const configuration = require('../../../../conf/config');
function createDir(id, dir) {
    try {
        fs.mkdirSync(configuration.folders.uploadDir.path + "/" + id);
    }
    catch (err) {
        return err;
    }
}
exports.createDir = createDir;
function remDir(id, dir) {
    try {
        fs.rmdirSync(configuration.folders.uploadDir.path + "/" + id);
    }
    catch (err) {
        return err;
    }
}
exports.remDir = remDir;
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
function uploadData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let data = req.files;
        let files = [];
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        else {
            Object.values(data.file).forEach(item => {
                let file = item;
                let uploadPath = configuration.uploadDir.path + `/${id}` + file.name;
                file.mv(uploadPath, err => {
                    if (!err)
                        files.push(file.name);
                });
            });
        }
        // next();
    });
}
exports.uploadData = uploadData;
