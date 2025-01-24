"use server";

import prisma from "@/lib/prisma";

export const getCategoryBlogs = async (cat: string) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        category: cat,
      },
      include: {
        _count: {
          select: {
            like: true,
          },
        },
      },
    });

    return { blogs };
  } catch (error) {
    console.log(error);
    return { error: "can not get blogs" };
  }
};
