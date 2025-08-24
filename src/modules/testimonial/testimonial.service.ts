import prisma from "../../config/db";

export const createTestimonial = async (data: any) => {
  return await prisma.testimonial.create({ data });
};

export const updateTestimonial = async (id: number, data: any) => {
  return await prisma.testimonial.update({ where: { id }, data });
};

export const deleteTestimonial = async (id: number) => {
  return await prisma.testimonial.delete({ where: { id } });
};

export const getAllTestimonials = async () => {
  return await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
};

// Get a single testimonial by ID
export const getTestimonialById = async (id: number) => {
  return await prisma.testimonial.findUnique({ where: { id } });
};

// Public frontend (active only)
export const getAllTestimonialsForFrontend = async () => {
  return await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};
