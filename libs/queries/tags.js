"use server";

import configs from "@/configs";

export async function getTags() {
  const url = new URL("/api/tags", configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}

export async function getTag(id) {
  if (!id) return { data: [], error: "Please provide ID of tag." };

  const url = new URL(`/api/tags/${id}`, configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}
