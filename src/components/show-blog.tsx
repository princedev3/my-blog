"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MoveRight, ThumbsUp } from "lucide-react";
// import { Blog } from "@prisma/client";
import { useSessionStore } from "./store/user-session";
import { addLikeAction } from "@/blog-actions/add-like";

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
const ShowBlog = ({
  allBlogs,
  pathName,
}: {
  allBlogs: blogType[];
  pathName: string;
}) => {
  const session = useSessionStore((state) => state.session);

  if (allBlogs?.length === 0) {
    return <div className=" mt-3 text-2xl font-semibold text-blue-950"></div>;
  }

  const addLike = async (id: string) => {
    const res = await addLikeAction(session?.user?.id as string, id, pathName);
  };
  return (
    <div className="grid md:grid-cols-2 gap-14 my-10 w-full">
      {allBlogs
        ?.sort(
          (a, b) =>
            Date.parse(b?.createdAt || "") - Date.parse(a?.createdAt || "")
        )
        ?.map((item, index) => {
          const imglength = item.imageUrls[0].split(`\\`);
          return (
            <div
              className=" motion-opacity-in-0 motion-translate-y-in-25 motion-blur-in-sm grid relative gap-y-6 shadow rounded-sm hover:scale-105 transition-all duration-1000 ease-in-out"
              key={item.id}
            >
              <div className="relative h-[40vh] w-full ">
                <Image
                  src={"/" + imglength[imglength.length - 1]}
                  fill
                  alt=""
                  className="object-cover rounded-sm "
                />
              </div>
              <div className="grid gap-y-1">
                <div className="flex justify-between  px-4">
                  <p className="text-gray-900 capitalize text-xl">
                    {item.title}{" "}
                  </p>
                  <div
                    onClick={() => addLike(item?.id)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <ThumbsUp className="w-4 h-4 " />
                    {item?._count?.like}
                  </div>
                </div>
                <p className=" px-4">{item.summary} </p>
                <Badge variant="default" className="absolute top-3 left-3">
                  {item.category}{" "}
                </Badge>
                <Link href={`/blog/${item.id}`} className="w-full">
                  <Button className="w-full cursor-pointer">
                    read more{" "}
                    <MoveRight className="font-bold  motion-preset-seesaw-sm " />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowBlog;
