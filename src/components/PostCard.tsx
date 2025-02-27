"use client";

import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/post/${post._id}`} className="block bg-white shadow-md rounded-lg overflow-hidden">
      <Image src={post.image} alt={post.title} width={500} height={300} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-gray-600">{post.description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
