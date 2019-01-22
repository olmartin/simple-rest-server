import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";
import axios, { AxiosResponse } from "axios";
import { parseString } from "xml2js";
import { Contact } from "./models/contact.model";

class App {
  public app: express.Application;
  public routes: Routes = new Routes();
  public mongoUrl: string = "mongodb://localhost/oli_db";

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    this.mongoSetup();
    this.test_xml();
    this.test_get_all();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }

  private test_get_all() {
    axios
      .get("http://localhost:3000/contact")
      .then((response: AxiosResponse<Contact[]>) => {
        console.log("--- All Contacts ---\n", response.data, "\n");
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {});
  }

  private test_xml() {
    axios
      .get("https://www.w3schools.com/xml/note.xml")
      .then((response: AxiosResponse<any>) => {
        const xml = response.data;
        console.log("--- XML ---\n", xml, "\n");
        this.toJson(xml).then(obj => {
          console.log("--- JSON ---\n", obj, "\n");
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {});
  }

  private toJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xml, { explicitArray: false }, (error, result) => {
        error !== null ? reject(error) : resolve(result);
      });
    });
  }
}

export default new App().app;
