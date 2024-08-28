import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../../services/api";
import { usePagination } from "../usePagination";

export function useListCharacters() {
  const {limitPage, page} = usePagination();

  const offset = page === 1 ? 0 : (page - 1) * limitPage;
  return useQuery({
    queryKey: ['listCharacters', {limitPage, page}],
    queryFn: () => getCharacters(offset, limitPage),
  });
}