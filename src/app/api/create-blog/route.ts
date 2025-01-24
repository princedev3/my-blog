import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "something went wrong" },
        { status: 500 }
      );
    }
    const data = await req.formData();
    const textArea: { [key: string]: string } = {};
    let file: File[] | null = [];

    Array.from(data.entries()).forEach(([key, value]) => {
      if (typeof value === "string") {
        textArea[key] = value;
      } else if (typeof value === "number") {
        textArea[key] = value;
      } else if (value instanceof File) {
        file.push(value);
      }
    });
    if (!file) {
      return new NextResponse(JSON.stringify({ error: "upload an image" }), {
        status: 500,
      });
    }
    const buffer: string[] = await Promise.all(
      file.map(async (item) => {
        const bytes = await item.arrayBuffer();
        const path = join(process.cwd(), "public", (item as File).name);
        const buffer = Buffer.from(bytes);
        await writeFile(path, buffer);
        return path;
      })
    );

    const { title, summary, category, desc } = textArea;

    if (!title || !summary || !category || !desc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await prisma.blog.create({
      data: {
        title,
        summary,
        category,
        desc,
        userId: String(session?.user?.id) as string,
        imageUrls: buffer,
      },
    });
    return NextResponse.json({ error: "can not create blog" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "can not create blog" }, { status: 500 });
  }
};
