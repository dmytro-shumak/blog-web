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

  return <PostForm mode="create" onSubmit={onSubmit} />;
}
