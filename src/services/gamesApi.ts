import { baseApi } from './baseApi';
import type { GameItem, TransformedGamesResponse, GetGamesBackendResponse } from './types/game.type';

export const gamesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<TransformedGamesResponse, { page: number; sortBy: string; sortOrder: 'asc' | 'desc'; search: string }>({
      query: ({ page = 1, sortBy = 'players', sortOrder = 'desc', search = '' }) => {
        const params: Record<string, any> = { page, sortBy, order: sortOrder };

        if (search && search.trim() !== '') {
          params.search = search.trim();
        }

        return {
          url: '/games',
          params,
        };
      },
      transformResponse: (response: GetGamesBackendResponse): TransformedGamesResponse => ({
        gamesList: response.data || [],
        total: response.total || 0,
        limit: response.limit || 20,
      })
    }),

    getGameById: builder.query<GameItem, number | string>({
      query: (id) => `/games/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetGamesQuery, 
  useGetGameByIdQuery 
} = gamesApi;