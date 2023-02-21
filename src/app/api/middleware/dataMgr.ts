import {NextFunction, Request, Response} from "express";
import {UploadedFile} from "express-fileupload";
// import * as fs from "fs";
const configuration = require('../../../../conf/config');
import {albumsSchema} from "../schemas";
import {myservicesSchema} from "../schemas";
import {carouselSchema} from "../schemas";

export async function setCoverPhoto(req: Request, res: Response) {

}

export async function deleteData(req: Request, res: Response) {

}

export async function fetchGallery(req: Request, res: Response) {
  let id              = req.params.id;
  let useSchema       = req.params.useSchema;

  if( useSchema==='albumsSchema' ) {
    await albumsSchema.findById({id});
  } else if( useSchema==='myservicesSchema' ) {
    await myservicesSchema.findById({id});
  }
}

export async function uploadData(req: Request, res: Response, next: NextFunction) {
  let id              = req.params.id;
  let useSchema       = req.params.useSchema;
  let data            = req.files;

  let fileslist: string[] = [];

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send('No files were uploaded.');
    } else {
      Object.values(data.file).forEach(item=>{
        let file = (item as UploadedFile);
        let uploadPath = configuration.uploadDir.pathAdress + `/${id}/` + file.name;

        file.mv(uploadPath,  async err => {
          if(!err) {
            if( useSchema==='albumsSchema' ) {
              await albumsSchema.findByIdAndUpdate(id, {$push: {'gallery': file.name}});
            } else if( useSchema==='myservicesSchema' ) {
              await myservicesSchema.findByIdAndUpdate(id, {$push: {'gallery': file.name}});
            }
          }
        });
      })
    }
}
