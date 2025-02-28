"use client";

import Editor from "@/components/Editor";
import { PostDto } from "@/lib/api";
import { Post } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  post?: Post;
  onSubmit: (data: PostDto) => Promise<void>;
  mode: 'create' | 'edit';
}

export default function PostForm({ post, onSubmit, mode = 'create' }: Props) {
  const { register, handleSubmit } = useForm<PostDto>({
    defaultValues: {
      title: post?.title,
      description: post?.description,
      image: post?.image,
    },
  });
  
  const [content, setContent] = useState("");

  async function submit(data: PostDto) {
    onSubmit({...data, content});
  }

  return (
    <div className="max-w-2xl mx-auto p-2 bg-white shadow-md rounded-lg sm:p-6">
      <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create' : 'Edit'} New Post</h1>

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
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

        <Editor onChange={setContent} defaultContent={post?.content} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {mode === 'create' ? 'Create' : 'Update'} Post
        </button>
      </form>
    </div>
  );
}
