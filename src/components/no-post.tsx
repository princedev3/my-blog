"use client";
import Image from "next/image";
import React from "react";

const NoPost = () => {
  return (
    <div className=" h-[calc(100vh-110px)] grid justify-center mt-10 ">
      <div className="flex flex-col gap-4">
        <Image
          src={"/ni.png"}
          width={300}
          height={300}
          alt=""
          className="object-cover"
        />
        <span className="text-gray-700 text-2xl text-center">
          No post avaliable
        </span>
      </div>
    </div>
  );
};

export default NoPost;
