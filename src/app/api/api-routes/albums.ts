"use strict";

import express, { Express, Request, Response } from 'express';
import {albumsSchema} from "../schemas";
import { responseHandler } from "../responseHandler";
const resHandler = new responseHandler;

const configuration = require('../../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.albums;

router.get(urls.getAll, getAll);
router.get(urls.getById+'/:id', getById);
router.post(urls.addNew, addNew);
router.put(urls.update+'/:id', update);
router.put(urls.uploadPhoto+'/:id', uploadPhoto);
router.delete(urls.remove+'/:id', remove);

async function getAll(req: Request, res: Response) {
  await albumsSchema.find({})
    .then(result => res.json( resHandler.sendRaw(result) ))
    .catch(error => {
      res.json( resHandler.failure(error) );
    })
}

async function getById(req: Request, res: Response) {
  let id = req.params.id;

  await albumsSchema.findById(id)
    .then(result => res.json( resHandler.sendRaw(result) ))
    .catch( error => res.json( resHandler.failure(error) ))
}

async function addNew(req: Request, res: Response) {
  await albumsSchema.create(
    {
      'isActive'        : req.body.isActive || false,
      "addDate"         : Date.now(),
      'clientName'      : req.body.clientName,
      'clientEmail'     : req.body.clientEmail,
      'coverPhoto'      : "",
      'accessCode'      : req.body.accessCode,
      'serviceId'       : req.body.serviceId,
      'clientInfo'      : req.body.clientInfo,
      'fileToDownload'  : "",
      'gallery'         : "",
    })
    .then(result => {res.json( resHandler.sendRaw(result) );})
    .catch(error => res.json( resHandler.failure(error) ));
}

async function update(req: Request, res: Response) {
  let id = req.params.id;

  await albumsSchema.findByIdAndUpdate(id,
    {
      'isActive'        : req.body.isActive,
      'clientName'      : req.body.clientName,
      'clientEmail'     : req.body.clientEmail,
      'accessCode'      : req.body.accessCode,
      'serviceId'       : req.body.serviceId,
      'clientInfo'      : req.body.clientInfo,
    })
    .then( result=>res.json(resHandler.sendRaw(result) ))
    .catch( error=> res.json( resHandler.failure(error) ));
}

async function uploadPhoto(req: Request, res: Response) {
  let uniqId = req.params.id;
}

async function remove(req: Request, res: Response) {
  let id = req.params.id;

  if (id) {
    await albumsSchema.findByIdAndDelete(id)
      .then(result => res.json(resHandler.sendRaw(result)))
      .catch(error => res.json(resHandler.failure(error)));
  }
}

module.exports = router;
