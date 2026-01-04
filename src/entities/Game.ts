import { Genre } from "./Genre";
import { Platform } from "./Platform";
import { Publisher } from "./Publisher";

export interface Game {
  id: number;
  name: string;
  slug: string;
  genres: Genre[];
  publishers: Publisher[];
  description_raw: string; // 新增属性
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}
