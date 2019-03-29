import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
require("express");

class Server {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.globalMiddleware();
    this.routes();
    this.errorHandler();
  }

  private globalMiddleware() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: true}));
  }

  private errorHandler() {
    this.express.use(
      async (error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (error.code === "error/not-found") {
          return res.status(404).json({
            error: error.message,
            code: error.code
          });
        }
        if (error.code === "error/login-error") {
          return res.status(400).json({
            error: error.message,
            code: error.code
          });
        }
        if (error.code === "error/transaction/error") {
          return res.status(400).json({
            error: error.message,
            code: error.code
          });
        }
        return res.status(500).json({
          error: error.message
        });
      })
  }

  private routes() {
    this.express.get('/', (req, res) => {
      res.json('OK');
    });
    this.express.use("/", require("./routes").default);
  }
}

export default Server;
