import blogApi from "@/lib/api/blog";
import { Blog } from "@/lib/types/blog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blog: Partial<Blog>) => blogApi.createBlog(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, blog }: { id: string; blog: Partial<Blog> }) =>
      blogApi.updateBlog(id, blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogApi.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
