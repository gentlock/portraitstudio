"use strict";

import express, { Express, Request, Response } from 'express';
import { carouselSchema } from "../schemas";

const configuration = require('../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.carousel;

router.get(urls.getAll, db_fetch_all);
router.get(urls.getById+'/:id', db_fetch_by_id);
router.post(urls.addNew, db_add_new);
router.put(urls.update+'/:id', db_update);
router.put(urls.uploadPhoto+'/:id', uploadPhoto);
router.delete(urls.remove+'/:id', db_delete);

async function db_fetch_all(req: Request, res: Response) {
  await carouselSchema.find({})
    .then(result => res.json( {result} ))
    .catch(error => {
      res.json( {error} );
    })
}
async function db_fetch_by_id(req: Request, res: Response) {
  let id = req.params.id;

  await carouselSchema.findById(id)
    .then(result => res.json({result} ))
    .catch( error => res.json( {error} ))
}
async function db_add_new(req: Request, res: Response) {
    await carouselSchema.create(
      {
        'isActive'  : req.body.isActive || false,
        "addDate"   : Date.now(),
        'name'      : req.body.name,
        'desc'      : req.body.desc,
        'subtitle'  : req.body.subtitle,
        'photo'     : "",
      })
      .then(result => {res.json( {result} );})
      .catch(error => res.json( {error} ));
}
async function db_update(req: Request, res: Response) {
  let id = req.params.id;

  await carouselSchema.findByIdAndUpdate(id,
    {
      'isActive'  : req.body.isActive || false,
      'name'      : req.body.name,
      'desc'      : req.body.desc,
      'subtitle'  : req.body.subtitle,
    })
    .then( result=>res.json( {result} ))
    .catch( error=> res.json( {error} ));
}
async function uploadPhoto(req: Request, res: Response) {
  let uniqId = req.params.id;
}
async function db_delete(req: Request, res: Response) {
  let id = req.params.id;

  if(id) {
    await carouselSchema.findByIdAndDelete(id)
      .then(result => res.json( {result} ))
      .catch(error => res.json( {error} ));
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


