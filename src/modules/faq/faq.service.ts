import prisma from "../../config/db";

export const createFAQ = async (data: any) => {
  return await prisma.fAQ.create({ data });
};

export const updateFAQ = async (id: number, data: any) => {
  return await prisma.fAQ.update({ where: { id }, data });
};

export const deleteFAQ = async (id: number) => {
  return await prisma.fAQ.delete({ where: { id } });
};

export const getAllFAQs = async () => {
  return await prisma.fAQ.findMany({ orderBy: { createdAt: "desc" } });
};

// Public frontend: active FAQs only
export const getAllFAQsFrontend = async () => {
  return await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};
