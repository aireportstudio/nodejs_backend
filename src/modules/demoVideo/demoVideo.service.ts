import prisma from "../../config/db";

export const createDemoVideo = async (data: any) => {
  return await prisma.demoVideo.create({ data });
};

export const updateDemoVideo = async (id: number, data: any) => {
  return await prisma.demoVideo.update({ where: { id }, data });
};

export const deleteDemoVideo = async (id: number) => {
  return await prisma.demoVideo.delete({ where: { id } });
};

export const getAllDemoVideos = async () => {
  return await prisma.demoVideo.findMany({ orderBy: { createdAt: "desc" } });
};

// Public frontend: active only
export const getAllDemoVideosFrontend = async () => {
  return await prisma.demoVideo.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};
