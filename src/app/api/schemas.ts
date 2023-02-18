import mongoose from 'mongoose';

const carouselS  = new mongoose.Schema ({
  "is-active"     : {type: Boolean, default: false},
  "name"          : String,
  "subtitle"      : String,
  "desc"          : String,
  "photo"         : String,
});

const myservicesS  = new mongoose.Schema ({
  "is-active"       : {type: Boolean, default: false},
  "addDate"         : {type: Date, default: Date.now},
  "name"            : String,
  "desc"            : String,
  "priceList"       : String,
  "galleryContent"  : [String],
  "coverPhoto"      : String,
});

const portfolioS  = new mongoose.Schema ({
  'is-active'       : {type: Boolean, default: false},
  'addDate'         : {type: Date, default: Date.now},
  'name'            : String,
  'desc'            : String,
  'clientName'      : String,
  'clientEmail'     : String,
  'coverPhoto'      : String,
  'accessCode'      : String,
  'serviceId'       : String,
  'clientInfo'      : String,
  'fileToDownload'  : String,
  'galleryContent'  : [String],
});

export const portfolioSchema = mongoose.model("portfolio", portfolioS);
export const carouselSchema  = mongoose.model("carousel", carouselS);
export const servicesSchema  = mongoose.model("services", myservicesS);
