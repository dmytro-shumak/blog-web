"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPost, CreatePostDto } from "@/lib/api";
import Editor from "@/components/Editor";

export default function CreatePostPage() {
  const { register, handleSubmit, setValue } = useForm<CreatePostDto>();
  const [content, setContent] = useState("");
  const router = useRouter();

  async function onSubmit(data: CreatePostDto) {
    try {
      await createPost({ ...data, content });
      router.push("/");
    } catch (error) {
      console.error("Error creating post", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          {...register("description", { required: true })}
          placeholder="Short description"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          {...register("image", { required: true })}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <Editor onChange={setContent} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
