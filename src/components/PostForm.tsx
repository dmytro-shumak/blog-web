"use client";

import Editor from "@/components/Editor";
import { PostDto } from "@/lib/api";
import { Post } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  post?: Post;
  onSubmit: (data: PostDto) => Promise<void>;
  mode: "create" | "edit";
}

export default function PostForm({ post, onSubmit, mode = "create" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostDto>({
    defaultValues: {
      title: post?.title,
      description: post?.description,
      image: post?.image,
    },
  });

  const [content, setContent] = useState("");

  async function submit(data: PostDto) {
    if (!content.trim()) {
      return;
    }

    onSubmit({ ...data, content });
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-2xl mx-auto p-2 bg-white shadow-md rounded-lg sm:p-6">
        <h1 className="text-2xl font-bold mb-4">
          {mode === "create" ? "Create New" : "Edit"} Post
        </h1>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("description", { required: "Description is required" })}
              placeholder="Short description"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("image", { required: "Image URL is required" })}
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          <Editor onChange={setContent} defaultContent={post?.content} />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {mode === "create" ? "Create" : "Update"} Post
          </button>
        </form>
      </div>
    </div>
  );
}
