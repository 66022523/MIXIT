"use server";

import configs from "@/configs";

export async function getUsers() {
  const url = new URL("/api/users", configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}

export async function getUserProfile(id) {
  if (!id) return { data: [], error: "Please provide ID of user." };

  const url = new URL(`/api/users/${id}`, configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}

export async function getUserFollowing(id, count) {
  if (!id) return { user: [], error: "Please provide ID of user." };

  const url = new URL(`/api/users/${id}/following`, configs.base_url);

  url.searchParams.append("count", count);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}

export async function getUserFollowers(id, count) {
  if (!id) return { user: [], error: "Please provide ID of user." };

  const url = new URL(`/api/users/${id}/followers`, configs.base_url);

  url.searchParams.append("count", count);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}

export async function getUserCircles(id) {
  if (!id) return { data: [], error: "Please provide ID of user." };

  const url = new URL(`/api/users/${id}/circles`, configs.base_url);
  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok) return { data: [], error: data };

  return { data, error: null };
}
