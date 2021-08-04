import { Express, Router } from 'express';
import { connect } from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './api-routes';

export default class App {
  app: Express;
  port = process.env.PORT || 3000;

  constructor(expressApp: Express) {
    this.app = expressApp;
  }

  init(): void {
    this.connectToDb();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded());
    this.routes(routes);
    this.app.listen(this.port);
  }

  routes(routes: Router): void {
    this.app.use(routes);
  }

  connectToDb(): void {
    connect('mongodb+srv://admin:dbadmin@cluster0.ggwrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
}
