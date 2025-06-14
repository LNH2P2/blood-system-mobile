import categoryApi from "@/lib/api/category";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getCategories(),
  });
}

export function useCategoryById(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryApi.getCategoryById(id),
    enabled: !!id,
  });
}
