"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const addLikeAction = async (
  userId: string,
  blogId: string,
  pathName: string
) => {
  try {
    const session = await auth();
    if (!userId || !blogId) {
      return { error: "can not complete action" };
    }
    if (!session) {
      return { error: "can not complete action" };
    }
    if (userId !== session?.user?.id) {
      return { error: "can not complete action" };
    }
    const alreadyLiked = await prisma.like.findFirst({
      where: {
        blogId: blogId as string,
        userId: userId as string,
      },
    });
    if (alreadyLiked) {
      await prisma.like.delete({
        where: {
          id: alreadyLiked?.id as string,
        },
      });
      revalidatePath("/" + pathName);
      return { success: "deleted" };
    }
    await prisma.like.create({
      data: {
        userId,
        blogId,
      },
    });

    revalidatePath("/" + pathName);

    return { success: "created" };
  } catch (error) {
    return NextResponse.json(
      { error: "can not complete action" },
      { status: 500 }
    );
  }
};
