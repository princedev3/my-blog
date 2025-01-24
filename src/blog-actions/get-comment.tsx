"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getComment = async (blogId: string) => {
  try {
    const session = await auth();
    if (!session) {
      return { error: "can not fetch comment" };
    }
    const comments = await prisma.comment.findMany({
      where: {
        blogId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return { comments };
  } catch (error) {
    console.log(error);
    return { error: "can not fetch comment" };
  }
};
