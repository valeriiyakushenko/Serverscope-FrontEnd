import type React from "react";
import { useParams } from "react-router-dom";
import { useGetGameByIdQuery, useGetServersQuery } from "../../services/gamesApi";
import styles from './GameServers.module.scss'
import { useState } from "react";
import { FilterInput } from "./components/FilterInput";
import { ServersTable } from "./components/ServersTable/ServersTable";
import { skipToken } from '@reduxjs/toolkit/query';

export const GameServers: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState(1);

    const [sortBy, setSortBy] = useState('rank');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [map, setMap] = useState('');
    const [address, setAddress] = useState('');

    const handleSortChange = (newField: string, newOrder: 'asc' | 'desc') => {
        setSortBy(newField);
        setSortOrder(newOrder);
        setPage(1); 
    };

    const targetAppid = id ? Number(id) : null;

    const { data: game, isLoading: isGameLoading, error: gameError } = useGetGameByIdQuery(
        targetAppid !== null ? targetAppid : skipToken
    );

    const { data: serversData, isLoading: isServersLoading, isFetching: isServersFetching } = useGetServersQuery(
        targetAppid !== null ? {
            appid: targetAppid,
            page,
            limit: 15,
            sortBy,
            sortOrder,
            search,
            map,
            location
        } : skipToken
    );

    const handleSearchChange = (val: string) => { setSearch(val); setPage(1); };
    const handleLocationChange = (val: string) => { setLocation(val); setPage(1); };
    const handleMapChange = (val: string) => { setMap(val); setPage(1); };

    if (isGameLoading) {
        return <div style={{ color: '#fff', padding: '40px', textAlign: 'center' }}>Loading game details...</div>;
    }

    if (gameError || !game) {
        return <div style={{ color: '#fff', padding: '40px', textAlign: 'center' }}>Error loading game data. Game not found.</div>;
    }

    const formattedServers = (serversData?.data || []).map(server => ({
        rank: server.rank || 0,
        name: server.name || "Unknown Server",
        players: `${server.players || 0}/${server.maxPlayers || 0}`,
        address: `${server.ip}:${server.gamePort}`,
        graphData: server.hourlyOnline || []
    }));

    return (
        <div className={styles.pageContainer}>
            <div className={styles.serversHeader}>
                <h1>{game.name} Game Servers</h1>
                <div className={styles.gridStats}>
                    <div className={styles.stat}>
                        <span className={styles.dot}></span>
                        <p>{(game.servers || 0).toLocaleString('en-US')} Servers</p>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.dot}></span>
                        <p>{(game.players || 0).toLocaleString('en-US')} Players</p>
                    </div>
                </div>
            </div>

            <div className={styles.filterCard}>
                <div className={styles.filterGrid}>
                    <FilterInput label="Search" placeholder="Search..." value={search} onChange={handleSearchChange} />
                    <FilterInput label="Location" placeholder="Region" value={location} onChange={handleLocationChange} />
                    <FilterInput label="Search by map" placeholder="Map" value={map} onChange={handleMapChange} />
                    <FilterInput label="Address" placeholder="IP Address" value={address} onChange={setAddress} />
                </div>
                <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>Status</span>
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" />
                            <span className={styles.customCheck}></span>
                            Best Rating
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" />
                            <span className={styles.customCheck}></span>
                            Featured
                        </label>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" />
                            <span className={styles.customCheck}></span>
                            Trending
                        </label>
                    </div>
                </div>
            </div>

            {isServersLoading || isServersFetching ? (
                <div style={{ color: '#fff', padding: '40px', textAlign: 'center' }}>Updating servers list...</div>
            ) : (
                <ServersTable 
                    serversList={formattedServers} 
                    totalCount={serversData?.total || 0}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    page={page}
                    onChangePage={setPage}
                    onChangeSort={handleSortChange}
                />
            )}
        </div>
    )
}