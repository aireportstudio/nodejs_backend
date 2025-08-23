import prisma from "../../config/db";

export const createBlog = async (data: any) => {
  return await prisma.blog.create({ data });
};

export const updateBlog = async (id: number, data: any) => {
  return await prisma.blog.update({ where: { id }, data });
};

export const deleteBlog = async (id: number) => {
  return await prisma.blog.delete({ where: { id } });
};

export const getAllBlogs = async () => {
  return await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
};

// Public frontend blogs (only active)
export const getAllBlogsForFrontend = async () => {
  return await prisma.blog.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};
