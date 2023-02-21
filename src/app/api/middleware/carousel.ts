import {Request, Response} from "express";
import {carouselSchema} from "../schemas";

export async function db_fetch_all(req: Request, res: Response) {
  await carouselSchema.find({}).sort({addDate: -1})
    .then(result => res.json( result ))
    .catch(error => {
      res.json( {error} );
    })
}
export async function db_fetch_by_id(req: Request, res: Response) {
  let id = req.params.id;

  await carouselSchema.findById(id)
    .then(result => res.json(result ))
    .catch( error => res.json( {error} ))
}
export async function db_add_new(req: Request, res: Response) {
  await carouselSchema.create(
    {
      'isActive'  : req.body.isActive || false,
      "addDate"   : Date.now(),
      'name'      : req.body.name,
      'desc'      : req.body.desc,
      'subtitle'  : req.body.subtitle,
      'photo'     : "",
    })
    .then(result => {res.json( result );})
    .catch(error => res.json( {error} ));
}
export async function db_update(req: Request, res: Response) {
  let id = req.params.id;

  if(!!id) {
    await carouselSchema.findByIdAndUpdate(id,
      {
        'isActive': req.body.isActive || false,
        'name': req.body.name,
        'desc': req.body.desc,
        'subtitle': req.body.subtitle,
      })
      .then(result => res.json(result))
      .catch(error => res.json({error}));
  } else {
    return res.status(500).send({ error: 'brakuje numeru ID' })
  }
}

export async function db_delete(req: Request, res: Response) {
  let id = req.params.id;

  if(id) {
    await carouselSchema.findByIdAndDelete(id)
      .then(result => res.json( result ))
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
