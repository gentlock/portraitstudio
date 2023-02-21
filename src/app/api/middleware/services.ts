import {Request, Response} from "express";
import {myservicesSchema} from "../schemas";

export async function db_fetch_all(req: Request, res: Response) {
  await myservicesSchema.find({}).sort({addDate: -1})
    .then(result => res.json( result ))
    .catch(error => {
      res.json( {error} );
    })
}
export async function db_fetch_by_id(req: Request, res: Response) {
  let id = req.params.id;

  await myservicesSchema.findById(id)
    .then(result => res.json( result ))
    .catch( error => res.json( {error} ))
}
export async function db_add_new(req: Request, res: Response) {
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
    .then(result => {res.json( result )})
    .catch(error => res.json( {error} ));
}
export async function db_update(req: Request, res: Response) {
  let id = req.params.id;

  if(!!id) {
    await myservicesSchema.findByIdAndUpdate(id,
      {
        'isActive': req.body.isActive,
        'name': req.body.name,
        'desc': req.body.desc,
        'subtitle': req.body.subtitle,
        "priceList": req.body.priceList,
      })
      .then(result => res.json(result))
      .catch(error => res.json({error}));
  } else {
    return res.status(500).send({ error: 'brakuje numeru ID' })
  }
}
export async function  db_delete(req: Request, res: Response) {
  let id = req.params.id;

  if (id) {
    await myservicesSchema.findByIdAndDelete(id)
      .then(result => res.json(result))
      .catch(error => res.json({error}));
  }
}
