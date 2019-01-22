import { Request, Response } from "express";

import { ContactController } from "../controllers/controllers";

export class Routes {
  public contactCtrl: ContactController = new ContactController();

  public routes(app): void {
    app.route("/contact").post(this.contactCtrl.addNewContact);
    app.route("/contact").get(this.contactCtrl.getContacts);
    app.route("/contact/:contactId").get(this.contactCtrl.getContactWithID);
    app.route("/contact/:contactId").put(this.contactCtrl.updateContact);
    app.route("/contact/:contactId").delete(this.contactCtrl.deleteContact);
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!"
      });
    });
  }
}
