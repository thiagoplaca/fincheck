import { useQuery } from "@tanstack/react-query";
import { categoriesServices } from "../services/categoriesService";

export function useCategories() {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesServices.getAll,
  });

  return {
    categories: data ?? [],
    isPending,
  };
}
