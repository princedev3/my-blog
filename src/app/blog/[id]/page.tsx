import { getComment } from "@/blog-actions/get-comment";
import SingleBlog from "@/components/single-blog";
import prisma from "@/lib/prisma";
import React from "react";
interface Params {
  id: string;
}
interface PageProps {
  params: Promise<Params>;
}

const SingleBlogPage = async ({ params }: PageProps) => {
  const { id } = await params;
  if (!id) {
    return null;
  }

  const { comments } = await getComment(id);

  const singleblog = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          like: true,
        },
      },
    },
  });
  return <SingleBlog singleblog={singleblog} commentsList={comments as []} />;
};

export default SingleBlogPage;
