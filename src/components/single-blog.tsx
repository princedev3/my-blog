"use client";
import { Blog, Comment } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { ThumbsUp, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSessionStore } from "./store/user-session";
import { createComment } from "@/blog-actions/create-comment";
import { addLikeAction } from "@/blog-actions/add-like";
import { usePathname } from "next/navigation";
import { deleteComment } from "@/blog-actions/delete-comment";

type blogProp = Blog & {
  _count: { like: number };
};
type commentProp = Comment & {
  user: { name: string | null };
};
const SingleBlog = ({
  singleblog,
  commentsList,
}: {
  singleblog: blogProp | null;
  commentsList: commentProp[];
}) => {
  const session = useSessionStore((state) => state.session);
  const [selectedImage, setSelectedImage] = useState(0);
  const imglength = singleblog?.imageUrls[selectedImage].split(`\\`) as [];
  const [comments, setComments] = useState<string>("");
  const pathname = usePathname();

  const handleCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comments || !singleblog?.id || !session?.user?.id) {
      console.error("Invalid data provided. Cannot create comment.");
      return;
    }
    const res = await createComment(
      comments,
      singleblog?.id as string,
      session?.user?.id as string
    );
    if (res.success) {
      setComments("");
    }
  };
  const handleLikeAction = async () => {
    await addLikeAction(
      session?.user?.id as string,
      singleblog?.id as string,
      pathname
    );
  };
  const handleDeleteComment = async (id: string, userId: string) => {
    await deleteComment(id, userId, pathname);
  };
  return (
    <div className="mt-4">
      <div className="grid md:grid-flow-col  md:grid-cols-[2fr_1fr]  gap-4 ">
        <div className="relative w-full  h-[52vh]">
          <Image
            src={"/" + imglength[imglength.length - 1]}
            alt=""
            fill
            className="object-cover rounded-sm"
          />
          <Badge className="z-30 absolute top-3 left-3">
            {singleblog?.category}{" "}
          </Badge>
        </div>
        <div className=" ">
          <div className="relative grid grid-cols-3 gap-2 md:grid-cols-2  ">
            {singleblog?.imageUrls.map((item, idx) => (
              <Image
                onClick={() => setSelectedImage(idx)}
                key={idx}
                src={"/" + item.split(`\\`)[imglength.length - 1]}
                alt=""
                className="w-full h-[25vh] object-cover rounded-sm"
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-gray-700 text-sm mt-3">
          <span className="text-4xl text-blue-950 uppercase">
            {singleblog?.summary.slice(0, 1)}
          </span>
          <span className="text-xl">{singleblog?.summary.slice(1)}</span>
        </p>
        <p className="text-gray-700 text-sm mt-3">
          <span className="text-4xl text-blue-950 uppercase">
            {singleblog?.desc.slice(0, 1)}
          </span>
          <span className="text-base">{singleblog?.desc.slice(1)}</span>
        </p>
        <div
          className="flex items-center gap-1 my-2 cursor-pointer"
          onClick={handleLikeAction}
        >
          <ThumbsUp className="w-4 h-4 text-gray-700 " />
          <span className="text-gray-700">{singleblog?._count.like} </span>
        </div>
        <div className="grid  gap-y-5 my-2">
          <form
            onSubmit={handleCreateComment}
            className="grid md:grid-flow-col md:grid-cols-[1fr_auto] w-full gap-2 "
          >
            <Input
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full"
              placeholder="write a comment"
            />
            <Button type="submit" className="md:w-[120px] cursor-pointer">
              submit
            </Button>
          </form>
          <div className="grid gap-y-3">
            {commentsList?.map((item) => (
              <div
                key={item.id}
                className="grid grid-flow-col grid-cols-[auto_1fr_auto] auto-cols-max gap-3 "
              >
                <span className="">{item?.user?.name}: </span>
                <p className="text-gray-800 text-base">{item.desc}</p>
                {item.userId === session?.user?.id && (
                  <span>
                    <Trash
                      className="w-4 h-4 text-gray-600 mb-[2px] cursor-pointer "
                      onClick={() => handleDeleteComment(item.id, item.userId)}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
