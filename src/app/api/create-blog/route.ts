import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";

cloud.config({
  cloud_name: "dmi0ise3n",
  api_key: "397833361965363",
  api_secret: "8TMN-L2OkpSDrPDlqfo_jVnToyE",
  secure: true,
});

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
        return new Promise(async (resolve, reject) => {
          const bytes = Buffer.from(await item.arrayBuffer());
          const stream = cloud.uploader.upload_stream({}, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result?.secure_url as string);
            }
          });
          streamifier.createReadStream(bytes).pipe(stream);
        });
      })
    );

    const { title, summary, category, desc } = textArea;

    if (!title || !summary || !category || !desc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!buffer.length) {
      return { error: "no image" };
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
