import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "something went wrong" },
        { status: 500, headers }
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
        { status: 400, headers }
      );
    }
    if (!buffer.length) {
      return NextResponse.json({ error: "no image" }, { status: 500, headers });
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
    return NextResponse.json(
      { success: " create blog" },
      { status: 200, headers }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "can not create blog" },
      { status: 500, headers }
    );
  }
};
