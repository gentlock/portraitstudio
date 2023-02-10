import express, { Express, Request, Response } from 'express';
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
let authentictionRouter = require('./api-routes/authentication');
let portfolioRouter = require('./api-routes/portfolio');
let servicesRouter = require('./api-routes/services');

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/authentiction', authentictionRouter);
app.use('/portfolio', portfolioRouter);
app.use('/servicesRouter', servicesRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
