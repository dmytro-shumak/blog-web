import { appConfig } from "@/lib/config";
import PostPageHeader from "./PostPageHeader";
import { Post } from "@/types";
import Image from "next/image";

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`${appConfig.apiUrl}/posts/${id}`, { cache: "no-store" });
  return res.json();
};

type Params = Promise<{ id: string }>;

export default async function PostPage(props: { params: Params }) {
  const { id } = await props.params;
  const post = await getPost(id);

  return (
    <div className="container mx-auto p-4">
      <PostPageHeader post={post} />
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
