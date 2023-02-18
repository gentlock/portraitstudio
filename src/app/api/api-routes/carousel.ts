"use strict";

import express, { Express, Request, Response } from 'express';
import {carouselSchema} from "../schemas";
const configuration = require('../../../conf/config.json');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.urls.carousel;

router.get(urls.getAll, getAll);
router.get(urls.getById, getById);
router.post(urls.addNew, addNew);
router.put(urls.update, update);
router.put(urls.uploadPhoto, uploadPhoto);
router.delete(urls.remove, remove);

async function getAll(req: Request, res: Response) {
  let uniqId = req.params.id;

  await carouselSchema.find({})
    .then(result => res.json(result))
    .catch(error => {
      res.json({'message': `: ${error}`, 'errFlag': true});
    })
}
async function getById(req: Request, res: Response) {
  let id = req.params.id;

  await carouselSchema.findById(id)
    .then(result => res.json({'message': `pobrano rekord`}))
    .catch( error => res.json({'message': `: ${error}`, 'errFlag': true} ))
}
async function addNew(req: Request, res: Response) {
  await carouselSchema.create(
    {
      'is-active' : req.body.activeOrNot || false,
      'name'    : req.body.serviceName,
      'desc'    : req.body.desc,
      'subtitle': req.body.subtitle,
      'photo'   : "",
    })
    .then(
      result=> {
        res.json({'message': 'dodano nowy rekord'});
      }
    )
    .catch( error=> res.json({'message': `: ${error}`, 'errFlag': true} ));
}
async function update(req: Request, res: Response) {
  let uniqId = req.params.id;
}
async function uploadPhoto(req: Request, res: Response) {
  let uniqId = req.params.id;
}
async function remove(req: Request, res: Response) {
  let uniqId = req.params.id;
}

module.exports = router;

