import prisma from "../../config/db";

export const createBlog = async (data: any) => {
  if (typeof data.tags === "string") {
    data.tags = JSON.parse(data.tags); // convert JSON string to array
  }
  if (typeof data.seo === "string") {
    data.seo = JSON.parse(data.seo); // convert JSON string to object
  }
  if (typeof data.faqs === "string") {
    data.faqs = JSON.parse(data.faqs); // convert JSON string to array/object
  }
  if (data.readTime && typeof data.readTime === "string") {
    data.readTime = parseInt(data.readTime, 10); // convert string to number
  }
    if (typeof data.featured === "string") {
    data.featured = data.featured === "true";
  }

  return await prisma.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      image: data.image,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      publishedDate: data.publishedDate ? new Date(data.publishedDate) : null,
      readTime: data.readTime,
      featured: data.featured || false,
      isActive: data.isActive === "true" || data.isActive === true,
      seo: data.seo,
      faqs: data.faqs,
    },
  });
};


export const updateBlog = async (id: number, data: any) => {
  if (typeof data.tags === "string") {
    data.tags = JSON.parse(data.tags);
  }
  if (typeof data.seo === "string") {
    data.seo = JSON.parse(data.seo);
  }
  if (typeof data.faqs === "string") {
    data.faqs = JSON.parse(data.faqs);
  }
  if (data.readTime && typeof data.readTime === "string") {
    data.readTime = parseInt(data.readTime, 10);
  }
    if (typeof data.featured === "string") {
    data.featured = data.featured === "true";
  }

  return await prisma.blog.update({
    where: { id },
    data: {
      ...data,
      tags: data.tags || undefined,
      publishedDate: data.publishedDate ? new Date(data.publishedDate) : undefined,
    },
  });
};



export const deleteBlog = async (id: number) => {
  return await prisma.blog.delete({ where: { id } });
};

export const getAllBlogs = async () => {
  return await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
};

export const getBlogById = async (id: number) => {
  return await prisma.blog.findUnique({ where: { id } });
};

export const getAllBlogsForFrontend = async () => {
  return await prisma.blog.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};
