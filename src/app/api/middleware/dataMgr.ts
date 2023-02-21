import {NextFunction, Request, Response} from "express";
import {FileArray, UploadedFile} from "express-fileupload";
import * as fs from "fs";
const configuration = require('../../../../conf/config');

export function createDir(id: string, dir: string) {
  try {
    fs.mkdirSync(configuration.folders.uploadDir.path + "/" + id);
  } catch(err) {
    return err;
  }
}

export function remDir(id: string, dir: string) {
  try {
    fs.rmdirSync(configuration.folders.uploadDir.path + "/" + id);
  } catch(err) {
    return err;
  }
}

export async function setCoverPhoto(req: Request, res: Response) {

}

export async function deleteData(req: Request, res: Response) {

}

export async function uploadData(req: Request, res: Response, next: NextFunction) {
  let id        = req.params.id;
  let data      = req.files;
  let files     = [];

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).send('No files were uploaded.');
    } else {
      Object.values(data.file).forEach(item=>{
        let file = (item as UploadedFile);
        let uploadPath = configuration.uploadDir.path + `/${id}` + file.name;

        file.mv(uploadPath, err => {
          if(!err) files.push(file.name);
        });
      })
    }

    // next();
}



