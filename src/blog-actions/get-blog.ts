"use server";

import prisma from "@/lib/prisma";

export const getPosts = async (page: number) => {
  try {
    const POST_PER_PAGE = 4;
    const [post, count] = await prisma.$transaction([
      prisma.blog.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        include: {
          _count: {
            select: {
              like: true,
            },
          },
        },
      }),
      prisma.blog.count(),
    ]);
    return { post, count };
  } catch (error) {
    console.log(error);
    return { error: "can not get blog" };
  }
};
