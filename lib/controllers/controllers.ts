import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { ContactSchema } from "../models/contact.model";

const MgContact = mongoose.model("Contact", ContactSchema);

export class ContactController {
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
