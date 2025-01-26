"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const deleteBlog = async (blogId: string, creatorId: string) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "can not delete post" },
        { status: 500 }
      );
    }
    if (session.user?.id !== creatorId) {
      return NextResponse.json(
        { error: "can not delete post" },
        { status: 500 }
      );
    }

    const deleteBlog = await prisma.blog.delete({
      where: {
        id: blogId,
        userId: creatorId,
      },
    });
    return { success: true, message: "Blog deleted successfully", status: 200 };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "can not delete post" }, { status: 500 });
  }
};
