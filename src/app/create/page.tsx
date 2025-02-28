"use client";

import PostForm from "@/components/PostForm";
import { createPost, PostDto } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();

  async function onSubmit(data: PostDto) {
    try {
      await createPost(data);
      router.push("/");
    } catch (error) {
      console.error("Error creating post", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <PostForm mode="create" onSubmit={onSubmit}/>
    </div>
  );
}
