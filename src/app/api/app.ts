import express, { Express, Request, Response } from 'express';
import path from "path";
import mongoose from 'mongoose';
const fileUpload = require('express-fileupload');
const configuration = require('../../conf/config.json');

// DOTENV
import dotenv from 'dotenv';
dotenv.config();

let authenticationRouter = require('./api-routes/authentication');
let portfolioRouter     = require('./api-routes/portfolio');
let servicesRouter      = require('./api-routes/services');
let carouselRouter      = require('./api-routes/carousel');

// baza danych MongoDB
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://"+configuration.db.host+":"+configuration.db.port+"/"+configuration.db.database);

const app: Express = express();
const port = process.env.PORT;

app.set("configuration", configuration);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/authentication' , authenticationRouter);
app.use('/portfolio'      , portfolioRouter);
app.use('/servicesRouter' , servicesRouter);
app.use('/carouselRouter' , carouselRouter);
app.use(fileUpload());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
