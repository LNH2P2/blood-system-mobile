import blogApi from "@/lib/api/blog";
import { useQuery } from "@tanstack/react-query";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogApi.getBlogs(),
  });
}

export function useBlogById(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogApi.getBlogById(id),
    enabled: !!id,
  });
}
