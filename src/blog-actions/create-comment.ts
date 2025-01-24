"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createComment = async (
  desc: string,
  blogId: string,
  userId: string
) => {
  try {
    if (!desc || !userId || !blogId) {
      console.error("Missing data:", { desc, userId, blogId });
      return { error: "Cannot create comment. Missing required fields." };
    }
    const comments = await prisma.comment.create({
      data: {
        userId,
        blogId,
        desc,
      },
    });
    revalidatePath("/blog/" + blogId);
    return { success: comments };
  } catch (error) {
    console.log(error);
    return { error: "can not create comment" };
  }
};
