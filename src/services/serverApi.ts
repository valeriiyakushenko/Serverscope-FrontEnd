import { baseApi } from "./baseApi";
import type { GetServersBackendResponse } from "./types/server.types";
import type { ServerItem } from "./types/server.types";

export const serverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getServers: builder.query<
            GetServersBackendResponse, 
            { 
                appid: number; 
                page?: number; 
                limit?: number; 
                sortBy?: string; 
                sortOrder?: 'asc' | 'desc'; 
                search?: string; 
                map?: string; 
                location?: string; 
                address?: string;
                isOnline?: boolean;
                isSecure?: boolean;
            }
        >({
            query: ({ 
                appid, 
                page = 1, 
                limit = 100, 
                sortBy = 'rank', 
                search = '', 
                sortOrder = 'asc', 
                map = '', 
                location = '', 
                address = '',
                isOnline,
                isSecure
            }) => {
                const params: Record<string, any> = { appid, page, limit, sortBy, sortOrder };

                if (search.trim()) params.search = search.trim();
                if (map.trim()) params.map = map.trim();
                if (location.trim()) params.location = location.trim();
                
                // КРИТИЧНЕ ВИПРАВЛЕННЯ: передаємо значення в "ip", бо бекенд очікує саме його
                if (address.trim()) params.ip = address.trim();
                
                // Додаємо фільтри, лише якщо вони чітко вибрані (не undefined)
                if (isOnline !== undefined) params.isOnline = String(isOnline);
                if (isSecure !== undefined) params.isSecure = String(isSecure);

                return {
                    url: '/servers',
                    params
                };
            }
        }),

        getServerById: builder.query<ServerItem, number | string>({
            query: (id) => `/servers/${id}`
        }),

        getServerChart: builder.query<{ points: { time: string; players: number }[] }, { id: string; period: string }>({
            query: ({ id, period }) => `servers/${id}/chart?period=${period}`,
        }),

        getServerRankChart: builder.query<{ points: { time: string; rank: number }[] }, { id: string; period: string }>({
            query: ({ id, period }) => `servers/${id}/rank-chart?period=${period}`,
        }),

        getServerUptimeChart: builder.query<{ points: { time: string; uptimeRatio: number }[] }, { id: string; period: string }>({
            query: ({ id, period }) => `servers/${id}/uptime-chart?period=${period}`,
        }),
    })
})

export const {
    useGetServersQuery,
    useGetServerByIdQuery,
    useGetServerChartQuery,
    useGetServerRankChartQuery,
    useGetServerUptimeChartQuery
} = serverApi;