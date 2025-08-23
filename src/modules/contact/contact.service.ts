import prisma from "../../config/db";

export const createContact = async (data: any) => {
  return await prisma.contact.create({ data });
};

// Admin list all contacts
export const getAllContacts = async () => {
  return await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
};
