import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

interface TransformedGamesResponse {
  gamesList: GameItem[];
  total: number;
  limit: number;
}


export interface ServerItem {
  id: number;
  ip: string;
  queryPort: number;
  gamePort: number;
  name: string;
  appid: number;
  map: string;
  isSecure: boolean;
  isDedicated: boolean;
  os: string;
  region: number;
  maxPlayers: number;
  players: number;
  rank: number;
  hourlyOnline: number[];
  isOnline: boolean;
  version: string;
  lastSeenAt: string;
  updatedAt: string;
}

export interface GetServersBackendResponse {
  data: ServerItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getGames: builder.query<TransformedGamesResponse, { page: number; sortBy: string; sortOrder: 'asc' | 'desc'; search: string }>({
      query: ({ page = 1, sortBy = 'players', sortOrder = 'desc', search = '' }) => {
        const params: Record<string, any> = { page, sortBy, sortOrder };

        if (search && search.trim() !== '') {
          params.search = search.trim();
        }

        return {
          url: '/games',
          params,
        };
      },
      transformResponse: (response: GetGamesBackendResponse): TransformedGamesResponse => {
        return {
          gamesList: response.data || [],
          total: response.total || 0,
          limit: response.limit || 20,
        };
      }
    }),

    getGameById: builder.query<GameItem, number | string>({
      query: (id) => `/games/${id}`,
    }),

    getServers: builder.query<GetServersBackendResponse, { appid: number; page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; search?: string; map?: string; location?: string, address?: string}>({
      query: ({appid, page = 1, limit = 100, sortBy = 'rank',  search = '', sortOrder = 'asc', map = '', location = '', address = ''}) => {
        const params: Record<string, any> = { appid, page, limit, sortBy, sortOrder };

        if (search.trim()) params.search = search.trim();
        if (map.trim()) params.map = map.trim();
        if (location.trim()) params.location = location.trim();
        if (address.trim()) params.address = address.trim();

        return {
          url: '/servers',
          params
        };
      }
    })
  }),
});

export const { useGetGamesQuery, useGetGameByIdQuery, useGetServersQuery } = gamesApi;