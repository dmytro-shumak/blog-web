import { appConfig } from "@/lib/config";
import PostEditForm from "./PostEditForm";
import { Post } from "@/types";

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`${appConfig.apiUrl}/posts/${id}`, { cache: "no-store" });
  return res.json();
};

type Params = Promise<{ id: string }>;

export default async function UpdatePostPage(props: { params: Params }) {
  const { id } = await props.params;
  const post = await getPost(id);

  return <PostEditForm post={post} />;
}
