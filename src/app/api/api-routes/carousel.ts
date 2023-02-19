"use strict";

import express, { Express, Request, Response } from 'express';
import { carouselSchema } from "../schemas";
import { responseHandler } from "../responseHandler";
const resHandler = new responseHandler;

const configuration = require('../../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.carousel;

router.get(urls.getAll, getAll);
router.get(urls.getById+'/:id', getById);
router.post(urls.addNew, addNew);
router.put(urls.update+'/:id', update);
router.put(urls.uploadPhoto+'/:id', uploadPhoto);
router.delete(urls.remove+'/:id', remove);

async function getAll(req: Request, res: Response) {
  await carouselSchema.find({})
    .then(result => res.json( resHandler.sendRaw(result) ))
    .catch(error => {
      res.json( resHandler.failure(error) );
    })
}
async function getById(req: Request, res: Response) {
  let id = req.params.id;

  await carouselSchema.findById(id)
    .then(result => res.json( resHandler.sendRaw(result) ))
    .catch( error => res.json( resHandler.failure(error) ))
}
async function addNew(req: Request, res: Response) {
    await carouselSchema.create(
      {
        'isActive'  : req.body.isActive || false,
        "addDate"   : Date.now(),
        'name'      : req.body.name,
        'desc'      : req.body.desc,
        'subtitle'  : req.body.subtitle,
        'photo'     : "",
      })
      .then(result => {res.json( resHandler.sendRaw(result) );})
      .catch(error => res.json( resHandler.failure(error) ));
}
async function update(req: Request, res: Response) {
  let id = req.params.id;

  await carouselSchema.findByIdAndUpdate(id,
    {
      'isActive'  : req.body.isActive || false,
      'name'      : req.body.name,
      'desc'      : req.body.desc,
      'subtitle'  : req.body.subtitle,
    })
    .then( result=>res.json(resHandler.sendRaw(result) ))
    .catch( error=> res.json( resHandler.failure(error) ));
}
async function uploadPhoto(req: Request, res: Response) {
  let uniqId = req.params.id;
}
async function remove(req: Request, res: Response) {
  let id = req.params.id;

  if(id) {
    await carouselSchema.findByIdAndDelete(id)
      .then(result => res.json( resHandler.sendRaw(result) ))
      .catch(error => res.json( resHandler.failure(error) ));
    // jesli w folderze byly jakies pliki
    // result?.photo
    //   try {
    //     fs.unlinkSync(configuration.folders.uploadDir + "\\" + result.id.toString() + "\\" + item);
    //   } catch (e) {}
    // });
    // fs.rmSync(configuration.folders.uploadDir + "\\" + result.id.toString(), { recursive: true, force: true });
  }
}

module.exports = router;


