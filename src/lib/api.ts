export interface CreatePostDto {
  title: string;
  description: string;
  content: string;
  image: string;
}

export async function createPost(postData: CreatePostDto) {
  const response = await fetch("http://localhost:3001/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}
