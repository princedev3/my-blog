"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteComment = async (
  id: string,
  userId: string,
  pathName: string
) => {
  try {
    const session = await auth();
    if (!session) {
      return { error: "can not delete comment" };
    }
    if (userId !== session.user?.id) {
      return { error: "can not delete comment" };
    }
    await prisma.comment.delete({
      where: {
        id,
        userId,
      },
    });
    revalidatePath(pathName);
  } catch (error) {
    console.log(error);
    return { error: "can not delete comment" };
  }
};
