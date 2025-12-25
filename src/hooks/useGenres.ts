import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<Genre>("/genres");
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    // 设置缓存时间为24小时（毫秒）
    staleTime: ms("24h"), // 24 hours
    // initialData: { count: genres.length, results: genres, next: null },
    initialData: genres,
  });

export default useGenres;
