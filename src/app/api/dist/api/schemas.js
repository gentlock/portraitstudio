"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesSchema = exports.carouselSchema = exports.portfolioSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const carouselS = new mongoose_1.default.Schema({
    "isActive": { type: Boolean, default: false },
    'addDate': { type: Date, default: Date.now },
    "name": String,
    "subtitle": String,
    "desc": String,
    "photo": String,
});
const myservicesS = new mongoose_1.default.Schema({
    "isActive": { type: Boolean, default: false },
    "addDate": { type: Date, default: Date.now },
    "name": String,
    "desc": String,
    "priceList": String,
    "galleryContent": [String],
    "coverPhoto": String,
});
const portfolioS = new mongoose_1.default.Schema({
    'isActive': { type: Boolean, default: false },
    'addDate': { type: Date, default: Date.now },
    'name': String,
    'desc': String,
    'clientName': String,
    'clientEmail': String,
    'coverPhoto': String,
    'accessCode': String,
    'serviceId': String,
    'clientInfo': String,
    'fileToDownload': String,
    'galleryContent': [String],
});
exports.portfolioSchema = mongoose_1.default.model("portfolio", portfolioS);
exports.carouselSchema = mongoose_1.default.model("carousel", carouselS);
exports.servicesSchema = mongoose_1.default.model("services", myservicesS);
