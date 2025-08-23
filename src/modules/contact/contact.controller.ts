import { Request, Response } from "express";
import * as contactService from "./contact.service";
import { created, ok, badRequest } from "../../utils/response";

// Create contact form submission (frontend)
export const createContactController = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    const contact = await contactService.createContact(data);
    return created(res, contact, "Contact form submitted successfully");
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};

// Admin list all contacts
export const getAllContactsController = async (req: Request, res: Response) => {
  try {
    const contacts = await contactService.getAllContacts();
    return ok(res, contacts);
  } catch (err: any) {
    return badRequest(res, err.message);
  }
};
