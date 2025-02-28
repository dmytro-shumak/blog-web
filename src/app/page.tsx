import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { appConfig } from "@/lib/config";

const POSTS_PER_PAGE = 6;

const getPosts = async (page: number = 1): Promise<{ posts: Post[]; total: number }> => {
  const res = await fetch(`${appConfig.apiUrl}/posts?page=${page}&limit=${POSTS_PER_PAGE}`, {
    cache: "no-store",
  });
  return res.json();
};

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const { posts, total } = await getPosts(currentPage);
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/create">
          <button className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-600">
            + New Post
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        {currentPage > 1 && (
          <Link href={`/?page=${currentPage - 1}`}>
            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Previous</button>
          </Link>
        )}

        <span className="text-lg font-semibold">
          {currentPage} / {totalPages}
        </span>

        {currentPage < totalPages && (
          <Link href={`/?page=${currentPage + 1}`}>
            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}
