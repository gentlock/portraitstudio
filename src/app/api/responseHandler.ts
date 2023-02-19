import { IHttpResponse } from "../core/abstracts";

export class responseHandler {
  msgStructure!: IHttpResponse;

  sendRaw = (msg: any): string => {
    return msg;
  }
  success = (msg: any): IHttpResponse =>  {
    this.msgStructure.message = msg;
    this.msgStructure.errFlag = false;

    return this.msgStructure;
  }

  failure = (msg: any): IHttpResponse => {
    this.msgStructure.message = msg;
    this.msgStructure.errFlag = true;

    return this.msgStructure;
  }
}
