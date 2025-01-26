import { getPosts } from "@/blog-actions/get-blog";
import NoPost from "@/components/no-post";
import { PaginationWithLinks } from "@/components/pagination-with-link";
import ShowBlog from "@/components/show-blog";
export const dynamic = "force-dynamic";

interface Params {
  page?: string;
}
interface PageProps {
  searchParams: Promise<Params>;
}
export default async function Home({ searchParams }: PageProps) {
  const { page } = await searchParams;

  const { post, count } = await getPosts(parseInt((page as string) || "1"));

  return (
    <div className="w-full">
      <ShowBlog allBlogs={post as []} pathName="/" />
      {post?.length && (
        <PaginationWithLinks
          pageSize={4}
          page={parseInt((page as string) || "1")}
          totalCount={count as number}
        />
      )}
    </div>
  );
}
