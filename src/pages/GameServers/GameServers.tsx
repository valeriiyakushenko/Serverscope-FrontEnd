import type React from "react";
import { useParams } from "react-router-dom";
import { useGetGameByIdQuery } from "../../services/gamesApi";
import styles from './GameServers.module.scss'
import { useState } from "react";
import { FilterInput } from "./components/FilterInput";
import { ServersTable } from "./components/ServersTable/ServersTable";

export const GameServers: React.FC = () => {
    const {id} = useParams<'id'>()
    
    const {data: game, isLoading, error} = useGetGameByIdQuery(id || '')

    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [map, setMap] = useState('');
    const [address, setAddress] = useState('');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !game) {
        return <div>Error loading game data. Game not found.</div>;
    }
    return (
        <div className={styles.pageContainer}>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading game data</div>} 
            <div className={styles.serversHeader}>
                <h1>{game.name} Game Servers</h1>
                <div className={styles.gridStats}>
                    <div className={styles.stat}>
                        <span className={styles.dot}></span>
                        <p>{game.servers.toLocaleString('en-US')} Servers</p>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.dot}></span>
                        <p>{game.players.toLocaleString('en-US')} Players</p>
                    </div>
                </div>
            </div>

            <div className={styles.filterCard}>
                <div className={styles.filterGrid}>
                    <FilterInput 
                        label="Search" 
                        placeholder="Search..." 
                        value={search} 
                        onChange={setSearch} 
                    />
                    <FilterInput 
                        label="Location" 
                        placeholder="Region" 
                        value={location} 
                        onChange={setLocation} 
                    />
                    <FilterInput 
                        label="Search by map" 
                        placeholder="Map" 
                        value={map} 
                        onChange={setMap} 
                    />
                    <FilterInput 
                        label="Search by map" 
                        placeholder="Map" 
                        value={address} 
                        onChange={setAddress} 
                    />
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

            <ServersTable serversList={game.serversList || []} />
        </div>
    )
}