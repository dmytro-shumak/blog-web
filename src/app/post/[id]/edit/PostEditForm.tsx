"use client";

import PostForm from "@/components/PostForm";
import { PostDto, editPost } from "@/lib/api";
import { Post } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  post: Post;
}

const PostEditForm: React.FC<Props> = ({ post }) => {
  const router = useRouter();

  async function onSubmit(data: PostDto) {
    try {
      await editPost(post._id, data);
      router.push("/");
    } catch (error) {
      console.error("Error updating post", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm onSubmit={onSubmit} post={post} redirectUrl={`/post/${post._id}`} mode="edit" />
    </div>
  );
};

export default PostEditForm;