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
  popularity?: number;
  stability?: number;
  createdAt?: string;
}

export interface GetServersBackendResponse {
  data: ServerItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}