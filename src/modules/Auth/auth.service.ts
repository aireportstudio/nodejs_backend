import prisma from "../../config/db";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
