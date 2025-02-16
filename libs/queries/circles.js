"use server";

import configs from "@/configs";

export async function getCircles() {
  const url = new URL("/api/circles", configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}

export async function getCircle(id) {
  if (!id) return { data: [], error: "Please provide ID of circle." };

  const url = new URL(`/api/circles/${id}`, configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}
