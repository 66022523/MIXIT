import useSWR from "swr";

import { fetcher } from "@/utils/fetcher";

export default function useUser(id) {
  return useSWR(id && `/api/v1/users/${id}`, fetcher);
}
