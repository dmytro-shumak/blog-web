import { appConfig } from "@/lib/config";

export interface PostDto {
  title: string;
  description: string;
  content: string;
  image: string;
}

export async function createPost(postData: PostDto) {
  const response = await fetch(`${appConfig.apiUrl}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}


export async function editPost(id:string, postData: PostDto) {
  const response = await fetch(`${appConfig.apiUrl}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
}
