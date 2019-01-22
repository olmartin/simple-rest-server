import * as mongoose from "mongoose";
import { Request, Response } from "express";
import {
  ContactSchema,
  InterventionSchema,
  Intervention
} from "../models/contact.model";

const MgContact = mongoose.model("Contact", ContactSchema);
const MgIntervention = mongoose.model("Intervention", InterventionSchema);

export class ContactController {
  public addNewIntervention(req: Request, res: Response) {
    let newIntervention = new MgIntervention(req.body);
    newIntervention.save((err, contact) => {
      err ? res.send(err) : res.json(contact);
    });
  }

  public getInterventions(req: Request, res: Response) {
    MgIntervention.find({}, (err, contact) => {
      err ? res.send(err) : res.json(contact);
    });
  }

  //
  // Contact test examples
  //
  public addNewContact(req: Request, res: Response) {
    let newContact = new MgContact(req.body);

    newContact.save((err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  public getContacts(req: Request, res: Response) {
    MgContact.find({}, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  public getContactWithID(req: Request, res: Response) {
    MgContact.findById(req.params.contactId, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  public updateContact(req: Request, res: Response) {
    MgContact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true },
      (err, contact) => {
        if (err) {
          res.send(err);
        }
        res.json(contact);
      }
    );
  }

  public deleteContact(req: Request, res: Response) {
    MgContact.remove({ _id: req.params.contactId }, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted contact!" });
    });
  }
}
