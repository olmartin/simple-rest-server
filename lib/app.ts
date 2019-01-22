import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";
import axios, { AxiosResponse } from "axios";
import { parseString } from "xml2js";
import { Contact, Intervention } from "./models/contact.model";

class App {
  public app: express.Application;
  public routes: Routes = new Routes();
  public mongoUrl: string = "mongodb://localhost/oli_db";

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    this.mongoSetup();
    //this.test_xml_w3();
    this.test_parse_and_save();
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

  private test_parse_and_save() {
    const xml_pmg =
      '<intervention seqno="0030" streetname="avenue du chien" cityname="cityname" longitude="5.82151822858613" latitude="49.6871032992925" description="desc" remarks="zbra" callref="2019-000-0000" date="2019-01-22" time="10:10:10" phoneno="" controlroomname="ctrl" sectorcode="be" servicename="PMG X"><trip servicetype="PMG" servicename="PMG X"/><trip servicetype="STT" servicename="X - PMG Y"/></intervention>';
    this.toJson(xml_pmg)
      .then(data => {
        const intervention = data.intervention.$ as Intervention;
        if (data.intervention.trip)
          intervention.trip = data.intervention.trip.map(t => t.$);
        return intervention;
      })
      .then((intervention: Intervention) => {
        console.log(intervention);
        axios
          .post("http://localhost:3000/intervention", intervention)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(err => {
        console.error("xml parse fail", err);
      });
  }

  private test_xml_w3() {
    axios
      .get("https://www.w3schools.com/xml/note.xml")
      .then((response: AxiosResponse<any>) => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
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
