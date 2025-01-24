import ShowBlog from "@/components/show-blog";
import { getCategoryBlogs } from "@/blog-actions/getCategoryBlogs";
import React from "react";
type paramsType = {
  params: Promise<{ category: string }>;
};

type Blog = {
  id: string;
  title: string;
  userId: string;
  desc: string;
  summary: string;
  category: string;
  imageUrls: string[];
  likes: string[];
  createdAt: string;
};
type blogType = Blog & {
  _count: { like: number };
};

const CategoryPage = async ({ params }: paramsType) => {
  const { category } = await params;
  const { blogs } = await getCategoryBlogs(category);

  return <ShowBlog allBlogs={blogs as []} pathName={category} />;
};

export default CategoryPage;
