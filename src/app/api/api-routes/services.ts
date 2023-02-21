"use strict";

import express, { Express, Request, Response } from 'express';
import { myservicesSchema} from "../schemas";

const configuration = require('../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.myservices;

router.get(urls.getAll, db_fetch_all);
router.get(urls.getById+'/:id', db_fetch_by_id);
router.post(urls.addNew, db_add_new);
router.put(urls.update+'/:id', db_update);
router.put(urls.uploadPhoto+'/:id', uploadPhoto);
router.delete(urls.remove+'/:id', db_delete);


async function db_fetch_all(req: Request, res: Response) {
  await myservicesSchema.find({})
    .then(result => res.json( {result} ))
    .catch(error => {
      res.json( {error} );
    })
}
async function db_fetch_by_id(req: Request, res: Response) {
  let id = req.params.id;

  await myservicesSchema.findById(id)
    .then(result => res.json( {result} ))
    .catch( error => res.json( {error} ))
}
async function db_add_new(req: Request, res: Response) {
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
    .then(result => {res.json( {result} )})
    .catch(error => res.json( {error} ));
}
async function db_update(req: Request, res: Response) {
  let id = req.params.id;

  await myservicesSchema.findByIdAndUpdate(id,
    {
      'isActive'  : req.body.isActive,
      'name'      : req.body.name,
      'desc'      : req.body.desc,
      'subtitle'  : req.body.subtitle,
      "priceList" : req.body.priceList,
    })
    .then( result=>res.json( {result} ))
    .catch( error=> res.json( {error} ));
}
async function  db_delete(req: Request, res: Response) {
  let id = req.params.id;

  if(id) {
    await myservicesSchema.findByIdAndDelete(id)
      .then(result => res.json( {result} ))
      .catch(error => res.json( {error} ));
  }
}
async function uploadPhoto(req: Request, res: Response) {
  let uniqId = req.params.id;
}

module.exports = router;
