"use server";

import configs from "@/configs";

export async function getPosts() {
  const url = new URL("/api/posts", configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}

export async function getPost(id) {
  if (!id) return { data: [], error: "Please provide ID of post." };

  const url = new URL(`/api/posts/${id}`, configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}
