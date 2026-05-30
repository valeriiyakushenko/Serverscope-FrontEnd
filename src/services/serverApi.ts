import { baseApi } from "./baseApi";
import type { GetServersBackendResponse } from "./types/server.types";
import type { ServerItem } from "./types/server.types";


export const serverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getServers: builder.query<GetServersBackendResponse, { appid: number; page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; search?: string; map?: string; location?: string; address?: string }>({
            query: ({ appid, page = 1, limit = 100, sortBy = 'rank', search = '', sortOrder = 'asc', map = '', location = '', address = '' }) => {
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
        }),
        getServerById: builder.query<ServerItem, number | string>({
            query: (id) => `/servers/${id}`
        })
    })
})


export const {
    useGetServersQuery,
    useGetServerByIdQuery
} = serverApi;