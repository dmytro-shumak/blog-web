import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:3001/posts", { cache: "no-store" });
  return res.json();
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between  mb-6">
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
    </div>
  );
}
