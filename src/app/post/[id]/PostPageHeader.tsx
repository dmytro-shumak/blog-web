"use client";

import { Post } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  post: Post;
}

export default function PostPageHeader({ post }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`http://localhost:3001/posts/${post._id}`, { method: "DELETE" });
    router.push("/");
  };

  return (
    <div className="my-6 flex space-x-4">
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <button
        onClick={handleDelete}
        className="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
      <button
        onClick={() => router.push(`/post/${post._id}/edit`)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Edit
      </button>
    </div>
  );
}
