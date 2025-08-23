import prisma from "../../config/db";

export const createPricing = async (data: any) => {
  return await prisma.pricing.create({ data });
};

export const updatePricing = async (id: number, data: any) => {
  return await prisma.pricing.update({ where: { id }, data });
};

export const deletePricing = async (id: number) => {
  return await prisma.pricing.delete({ where: { id } });
};

export const getAllPricings = async () => {
  return await prisma.pricing.findMany({ orderBy: { createdAt: "desc" } });
};

// Public frontend: active pricing plans only
export const getAllPricingsFrontend = async () => {
  return await prisma.pricing.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};
