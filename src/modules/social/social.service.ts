import prisma from "../../config/db";

export const createSocial = async (data: any) => {
  return await prisma.social.create({ data });
};

export const updateSocial = async (id: number, data: any) => {
  return await prisma.social.update({ where: { id }, data });
};

export const deleteSocial = async (id: number) => {
  return await prisma.social.delete({ where: { id } });
};

export const getAllSocials = async () => {
  return await prisma.social.findMany({ orderBy: { createdAt: "desc" } });
};

// Public frontend: active only
export const getAllSocialsFrontend = async () => {
  return await prisma.social.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};
