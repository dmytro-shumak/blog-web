import PostEditForm from "./PostEditForm";
import { Post } from "@/types";

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, { cache: "no-store" });
  return res.json();
};

export default async function UpdatePostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return <PostEditForm post={post} />;
}