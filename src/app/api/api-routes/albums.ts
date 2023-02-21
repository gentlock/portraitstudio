"use strict";

import express, { Express, Request, Response } from 'express';
import {albumsSchema} from "../schemas";
const configuration = require('../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.albums;

router.get(urls.getAll, db_fetch_all);
router.get(urls.getById+'/:id', db_fetch_by_id);
router.post(urls.addNew, db_add_new);
router.put(urls.update+'/:id', db_update);
router.put(urls.uploadPhoto+'/:id', uploadPhoto);
router.delete(urls.remove+'/:id', db_delete);

async function db_fetch_all(req: Request, res: Response) {
  await albumsSchema.find({})
    .then(result => res.json( {result} ))
    .catch(error => {
      res.json( {error} );
    })
}

async function db_fetch_by_id(req: Request, res: Response) {
  let id = req.params.id;

  await albumsSchema.findById(id)
    .then(result => res.json( {result} ))
    .catch( error => res.json( {error} ))
}

async function db_add_new(req: Request, res: Response) {
  await albumsSchema.create(
    {
      'isActive'        : req.body.isActive || false,
      "addDate"         : Date.now(),
      'name'            : req.body.name,
      'clientName'      : req.body.clientName,
      'clientEmail'     : req.body.clientEmail,
      'coverPhoto'      : "",
      'accessCode'      : req.body.accessCode,
      'serviceId'       : req.body.serviceId,
      'clientInfo'      : req.body.clientInfo,
      'desc'            : req.body.desc,
      'fileToDownload'  : "",
      'gallery'         : "",
    })
    .then(result => {res.json( {result} );})
    .catch(error => res.json( {error} ));
}

async function db_update(req: Request, res: Response) {
  let id = req.params.id;

  await albumsSchema.findByIdAndUpdate(id,
    {
      'isActive'        : req.body.isActive,
      'name'            : req.body.name,
      'clientName'      : req.body.clientName,
      'clientEmail'     : req.body.clientEmail,
      'accessCode'      : req.body.accessCode,
      'serviceId'       : req.body.serviceId,
      'clientInfo'      : req.body.clientInfo,
      'desc'            : req.body.desc,
    })
    .then( result=>res.json( {result} ))
    .catch( error=> res.json( {error} ));
}

async function uploadPhoto(req: Request, res: Response) {
  let uniqId = req.params.id;
}

async function db_delete(req: Request, res: Response) {
  let id = req.params.id;

  if (id) {
    await albumsSchema.findByIdAndDelete(id)
      .then(result => res.json( {result} ))
      .catch(error => res.json( {error} ));
  }
}

module.exports = router;
