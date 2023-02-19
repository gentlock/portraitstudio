"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
class responseHandler {
    constructor() {
        this.sendRaw = (msg) => {
            return msg;
        };
        this.success = (msg) => {
            this.msgStructure.message = msg;
            this.msgStructure.errFlag = false;
            return this.msgStructure;
        };
        this.failure = (msg) => {
            this.msgStructure.message = msg;
            this.msgStructure.errFlag = true;
            return this.msgStructure;
        };
    }
}
exports.responseHandler = responseHandler;
