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
      router.push(`/post/${post._id}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error updating post ${error.message}`);
      } else {
        alert(`Error updating post`);
      }
    }
  }

  return <PostForm onSubmit={onSubmit} post={post} mode="edit" />;
};

export default PostEditForm;
