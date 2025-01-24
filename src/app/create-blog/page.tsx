"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [imageOne, setImageOne] = useState<File>();
  const [imageTwo, setImageTwo] = useState<File>();
  const [imageThree, setImageThree] = useState<File>();
  const [category, setCategory] = useState("technology");
  const handleCreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    if (!imageOne || !imageTwo || !imageThree) return;
    formData.set("imageOne", imageOne);
    formData.set("imageTwo", imageTwo);
    formData.set("imageThree", imageThree);
    formData.append("category", category);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/create-blog`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.ok) {
      target.reset();
    }
    setLoading(false);
  };
  return (
    <Card className="mt-3">
      <CardContent className="">
        <form action="" onSubmit={handleCreateBlog} className="grid gap-y-4">
          <div className="grid gap-y-1">
            <label
              htmlFor=""
              className="capitalize text-lg text-zinc-700 tracking-normal"
            >
              title
            </label>
            <Input type="text" name="title" />
          </div>
          <div className="grid gap-y-1">
            <label
              htmlFor=""
              className="capitalize text-lg text-zinc-700 tracking-normal"
            >
              summary
            </label>
            <Input type="text" name="summary" />
          </div>
          <div className="grid gap-y-1">
            <label
              htmlFor=""
              className="capitalize text-lg text-zinc-700 tracking-normal"
            >
              description
            </label>
            <Textarea
              name="desc"
              placeholder="Type your message here."
              className="min-h-[20vh] "
            />
          </div>
          <div className="grid gap-y-1">
            <label
              htmlFor=""
              className="capitalize text-lg text-zinc-700 tracking-normal"
            >
              categories
            </label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="othermatter">Other Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-y-1  mt-3">
            <label
              htmlFor=""
              className="capitalize text-lg text-zinc-700 tracking-normal"
            >
              Photo one
            </label>
            <Input
              type="file"
              onChange={(e) => setImageOne(e.target.files?.[0])}
              name="imageOne"
            />
          </div>
          <div className="grid gap-y-1  mt-3">
            <label
              htmlFor=""
              className="capitalize text-lg text-zinc-700 tracking-normal"
            >
              Photo two
            </label>
            <Input
              type="file"
              onChange={(e) => setImageTwo(e.target.files?.[0])}
              name="imageTwo"
            />
          </div>
          <div className="grid gap-y-1 mt-3">
            <label
              htmlFor=""
              className="capitalize text-lg text-zinc-700 tracking-normal"
            >
              Photo three
            </label>
            <Input
              type="file"
              name="imageThree"
              onChange={(e) => setImageThree(e.target.files?.[0])}
            />
          </div>
          <Button
            disabled={loading}
            className="w-full capitalize text-lg  tracking-normal"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={20} />
            ) : (
              "  create blog"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBlog;
