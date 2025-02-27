
import { Post } from "@/types";
import Image from "next/image";

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, { cache: "no-store" });
  return res.json();
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <Image src={post.image} alt={post.title} width={800} height={400} className="w-full h-80 object-cover" />
      <div className="prose max-w-2xl mt-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
