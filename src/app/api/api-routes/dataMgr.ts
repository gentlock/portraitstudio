"use strict";

import express, { Express, Request, Response } from 'express';
import {deleteData, fetchGallery, setCoverPhoto, uploadData} from "../middleware/dataMgr";
const configuration = require('../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.dataMgr;

router.put(urls.uploadData+'/:id/:useSchema', uploadData);
router.delete(urls.remove+'/:id', deleteData);
router.get(urls.setCoverPhoto+'/:id',setCoverPhoto);
router.get(urls.fetchGallery+'/:id/:useSchema', fetchGallery);

module.exports = router;
