import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Фейкові сервери для Counter-Strike 2
const CS2_SERVERS = [
  { rank: 1, name: 'CYBERSHOKE Respawm #1 (128 rtr)', players: '18 / 20', address: '46.174.52.22:27015' },
  { rank: 2, name: 'WARMOD Pro Bounce [EU]', players: '10 / 10', address: '185.242.114.5:27015' },
  { rank: 3, name: 'Mirage Only 24/7 [FREE VIP]', players: '24 / 26', address: '91.211.118.42:27015' },
  { rank: 4, name: 'Retake Servers #4 (Standard)', players: '7 / 9', address: '46.174.53.99:27015' },
];

// Фейкові сервери для DayZ (якраз під твій макет з Figma)
const DAYZ_SERVERS = [
  { rank: 1, name: 'EU Hardcore Survival', players: '58 / 60', address: '185.42.87.12:2302' },
  { rank: 2, name: 'US Vanilla+ Loot', players: '44 / 60', address: '192.154.228.77:2302' },
  { rank: 3, name: 'DayZ Underground RP', players: '60 / 60', address: '104.243.38.56:2302' },
  { rank: 4, name: 'Fresh Wipe PvP Zone', players: '36 / 60', address: '176.9.21.144:2402' },
  { rank: 5, name: 'No Mods Classic Server', players: '22 / 60', address: '51.195.63.89:2302' },
  { rank: 6, name: 'Zombie Apocalypse x2 Loot', players: '59 / 60', address: '88.198.72.33:2302' },
  { rank: 7, name: 'EU Roleplay Community', players: '58 / 60', address: '185.42.87.12:2302' },
  { rank: 8, name: 'Hardcore Winter Survival', players: '55 / 60', address: '135.125.189.201:2402' },
];

const MOCK_GAMES = [
  { id: 1, name: 'Counter-Strike 2', servers: 12845, players: 487230, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200', graphData: [10, 20, 15, 30, 25, 40], serversList: CS2_SERVERS },
  { id: 2, name: 'DayZ', servers: 9372, players: 301118, image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=200', graphData: [40, 35, 45, 30, 50, 48], serversList: DAYZ_SERVERS },
  { id: 3, name: 'Rust', servers: 15209, players: 612904, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=200', graphData: [20, 30, 25, 35, 45, 60], serversList: [] },
  { id: 4, name: 'Arma 3', servers: 6583, players: 198445, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=200', graphData: [15, 12, 18, 22, 20, 25], serversList: [] },
  { id: 5, name: 'Unturned', servers: 21947, players: 1024550, image: 'https://images.unsplash.com/photo-1580234810907-b40315b76418?q=80&w=200', graphData: [70, 80, 75, 90, 85, 95], serversList: [] },
  { id: 6, name: 'Squad', servers: 5978, players: 143667, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200', graphData: [30, 28, 35, 32, 40, 38], serversList: [] },
  { id: 7, name: 'Left 4 Dead 2', servers: 8115, players: 256903, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=200', graphData: [10, 15, 12, 18, 20, 19], serversList: [] },
  { id: 8, name: '7 Days to Die', servers: 11402, players: 429771, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=200', graphData: [25, 30, 35, 40, 38, 45], serversList: [] },
  { id: 9, name: 'Minecraft', servers: 45210, players: 1850320, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=200', graphData: [50, 55, 62, 58, 65, 72], serversList: [] },
  { id: 10, name: 'ARK: Survival Evolved', servers: 14230, players: 284150, image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=200', graphData: [30, 25, 35, 42, 38, 40], serversList: [] },
  { id: 11, name: 'Grand Theft Auto V', servers: 28450, players: 895340, image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=200', graphData: [60, 65, 58, 70, 75, 82], serversList: [] },
  { id: 12, name: 'Terraria', servers: 7120, players: 154900, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=200', graphData: [20, 18, 22, 25, 30, 28], serversList: [] },
  { id: 13, name: 'Team Fortress 2', servers: 5410, players: 112450, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=200', graphData: [15, 15, 17, 14, 19, 21], serversList: [] },
  { id: 14, name: 'Valheim', servers: 16890, players: 340120, image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200', graphData: [45, 50, 42, 48, 55, 63], serversList: [] },
  { id: 15, name: 'Palworld', servers: 31450, players: 912600, image: 'https://images.unsplash.com/photo-1548685913-fe6574340a49?q=80&w=200', graphData: [90, 85, 78, 82, 88, 85], serversList: [] },
  { id: 16, name: 'Project Zomboid', servers: 4890, players: 89450, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=200', graphData: [12, 14, 18, 16, 22, 25], serversList: [] },
  { id: 17, name: 'Apex Legends', servers: 18450, players: 560340, image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=200', graphData: [40, 45, 55, 52, 48, 50], serversList: [] },
  { id: 18, name: 'PUBG: BATTLEGROUNDS', servers: 22130, players: 684200, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200', graphData: [55, 58, 62, 60, 68, 65], serversList: [] },
  { id: 19, name: 'Garry\'s Mod', servers: 13540, players: 210450, image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=200', graphData: [25, 27, 24, 29, 28, 31], serversList: [] },
  { id: 20, name: 'Sons of the Forest', servers: 11200, players: 245100, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=200', graphData: [35, 40, 48, 45, 52, 58], serversList: [] },
  { id: 21, name: 'Enshrouded', servers: 9840, players: 178230, image: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=200', graphData: [20, 28, 35, 42, 39, 41], serversList: [] },
  { id: 22, name: 'Satisfactory', servers: 6120, players: 94560, image: 'https://images.unsplash.com/photo-1580234810907-b40315b76418?q=80&w=200', graphData: [15, 18, 17, 22, 25, 29], serversList: [] },
  { id: 23, name: 'The Forest', servers: 5230, players: 78120, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=200', graphData: [10, 12, 11, 14, 15, 18], serversList: [] },
  { id: 24, name: 'Conan Exiles', servers: 4150, players: 63400, image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=200', graphData: [14, 15, 13, 17, 16, 18], serversList: [] },
  { id: 25, name: 'Dead by Daylight', servers: 12400, players: 389400, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=200', graphData: [38, 42, 40, 45, 48, 52], serversList: [] },
  { id: 26, name: 'Rust Legacy', servers: 1450, players: 12300, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=200', graphData: [8, 7, 9, 6, 8, 7], serversList: [] },
  { id: 27, name: 'Insurgency: Sandstorm', servers: 3120, players: 45900, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200', graphData: [11, 13, 12, 10, 14, 15], serversList: [] },
  { id: 28, name: 'Hell Let Loose', servers: 2890, players: 54100, image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=200', graphData: [16, 18, 17, 19, 22, 24], serversList: [] },
  { id: 29, name: 'Factorio', servers: 8940, players: 134200, image: 'https://images.unsplash.com/photo-1580234810907-b40315b76418?q=80&w=200', graphData: [22, 25, 27, 26, 31, 35], serversList: [] },
  { id: 30, name: 'V Rising', servers: 10450, players: 215400, image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200', graphData: [30, 32, 45, 58, 52, 50], serversList: [] }
];

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getGames: builder.query({
      queryFn: ({ page = 1, sortBy = 'players', search = '' }) => {
        let filteredGames = MOCK_GAMES.filter(game => 
          game.name.toLowerCase().includes(search.toLowerCase())
        );

        filteredGames.sort((a: any, b: any) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          return b[sortBy] - a[sortBy];
        });

        const itemsPerPage = 15;
        const totalCount = filteredGames.length;
        const totalPages = Math.ceil(totalCount / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

        const totalServersGlobal = MOCK_GAMES.reduce((sum, g) => sum + g.servers, 0);
        const totalPlayersGlobal = MOCK_GAMES.reduce((sum, g) => sum + g.players, 0);
        const gamesTrackedGlobal = MOCK_GAMES.length;

        return {
          data: {
            games: paginatedGames,
            totalCount,
            totalPages,
            summaryStats: {
              totalServers: totalServersGlobal,
              totalPlayers: totalPlayersGlobal,
              gamesTracked: gamesTrackedGlobal
            }
          }
        };
      },
    }),

    getGameById: builder.query({
      queryFn: (id: number | string) => {
        const game = MOCK_GAMES.find(g => g.id === Number(id));

        if (!game) {
          return { error: { status: 404, data: 'Game not found' } };
        }

        return { data: game };
      }
    })
  }),
});

export const { useGetGamesQuery, useGetGameByIdQuery } = gamesApi;