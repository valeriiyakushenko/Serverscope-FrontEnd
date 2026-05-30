export interface GameItem {
  id: number;
  appid: number;
  name: string;
  image_link: string | null;
  players: number;
  servers: number;
  hourly_online: number[];
  updated_at: string;
}

export interface GetGamesBackendResponse {
  data: GameItem[];
  total: number;
  page: number;
  limit: number;
}

export interface TransformedGamesResponse {
  gamesList: GameItem[];
  total: number;
  limit: number;
}