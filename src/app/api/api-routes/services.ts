"use strict";

import express, { Express, Request, Response } from 'express';
import { myservicesSchema} from "../schemas";
import { responseHandler } from "../responseHandler";
const resHandler = new responseHandler;

const configuration = require('../../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.myservices;

router.get(urls.getAll, getAll);
router.get(urls.getById+'/:id', getById);
router.post(urls.addNew, addNew);
router.put(urls.update+'/:id', update);
router.put(urls.uploadPhoto+'/:id', uploadPhoto);
router.delete(urls.remove+'/:id', remove);


async function getAll(req: Request, res: Response) {
  await myservicesSchema.find({})
    .then(result => res.json( resHandler.sendRaw(result) ))
    .catch(error => {
      res.json( resHandler.failure(error) );
    })
}
async function getById(req: Request, res: Response) {
  let id = req.params.id;

  await myservicesSchema.findById(id)
    .then(result => res.json( resHandler.sendRaw(result) ))
    .catch( error => res.json( resHandler.failure(error) ))
}
async function addNew(req: Request, res: Response) {
  await myservicesSchema.create(
    {
      'isActive'  : req.body.isActive || false,
      "addDate"   : Date.now(),
      'name'      : req.body.name,
      'desc'      : req.body.desc,
      'subtitle'  : req.body.subtitle,
      "priceList" : req.body.priceList,
      "gallery"   : "",
      'coverPhoto': "",
    })
    .then(result => {res.json( resHandler.sendRaw(result) );})
    .catch(error => res.json( resHandler.failure(error) ));
}
async function update(req: Request, res: Response) {
  let id = req.params.id;

  await myservicesSchema.findByIdAndUpdate(id,
    {
      'isActive'  : req.body.isActive,
      'name'      : req.body.name,
      'desc'      : req.body.desc,
      'subtitle'  : req.body.subtitle,
      "priceList" : req.body.priceList,
    })
    .then( result=>res.json(resHandler.sendRaw(result) ))
    .catch( error=> res.json( resHandler.failure(error) ));
}
async function remove(req: Request, res: Response) {
  let id = req.params.id;

  if(id) {
    await myservicesSchema.findByIdAndDelete(id)
      .then(result => res.json(resHandler.sendRaw(result)))
      .catch(error => res.json(resHandler.failure(error)));
  }
}
async function uploadPhoto(req: Request, res: Response) {
  let uniqId = req.params.id;
}

module.exports = router;
