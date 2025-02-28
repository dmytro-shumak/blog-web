import PostPageHeader from "./PostPageHeader";
import { Post } from "@/types";
import Image from "next/image";

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`http://localhost:3001/posts/${id}`, { cache: "no-store" });
  return res.json();
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="container mx-auto p-4">
      <PostPageHeader post={post}/>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-80 object-cover"
      />
      <div className="prose max-w-2xl mt-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
