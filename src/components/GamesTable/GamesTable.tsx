import React, { useEffect, useState } from "react"
import { useGetGamesQuery } from "../../services/gamesApi"
import styles from './GamesTable.module.scss'
import { GameRow } from "../GameRow/GameRow"
import arrow from '../../img/svg/arrow-right.svg'

interface GamesTableProps {
    searchTerm: string;
    onStatsCalculated: (stats: { totalServers: number; gamesTracked: number; totalPlayers: number }) => void;
}

export const GamesTable: React.FC<GamesTableProps> = ({ searchTerm, onStatsCalculated }) => {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('players');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const { data, isLoading, isFetching } = useGetGamesQuery({ page, sortBy, sortOrder, search: searchTerm });

    useEffect(() => {
        if (data && data.gamesList) {
            const totalServersGlobal = data.gamesList.reduce((sum, g) => sum + (g.servers || 0), 0);
            const totalPlayersGlobal = data.gamesList.reduce((sum, g) => sum + (g.players || 0), 0);
            const gamesTrackedGlobal = data.total;

            onStatsCalculated({
                totalServers: totalServersGlobal,
                totalPlayers: totalPlayersGlobal,
                gamesTracked: gamesTrackedGlobal
            });
        }
    }, [data, onStatsCalculated]);

    if (isLoading) {
        return <div style={{ color: '#fff', padding: '40px', textAlign: 'center', fontSize: '18px' }}>Loading real-time data...</div>;
    }

    if (!data || !data.gamesList || data.gamesList.length === 0) {
        return <div style={{ color: '#fff', padding: '40px', textAlign: 'center', fontSize: '18px' }}>No games found matching your criteria.</div>;
    }

    const totalPages = Math.ceil(data.total / data.limit);

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
        setPage(1);
    };

    const getArrowStyle = (field: string) => {
        if (sortBy !== field) return { transform: 'none', opacity: 0.3, transition: 'transform 0.2s, opacity 0.2s' };
        
        const rotation = sortOrder === 'desc' ? 'rotate(90deg)' : 'rotate(270deg)';
        return {
            transform: rotation,
            color: '#C9FE37',
            transition: 'transform 0.2s'
        };
    };

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.header__section} onClick={() => handleSort('name')}>
                        Games
                        <img src={arrow} alt="arrow" style={getArrowStyle('name')} />
                    </div>
                    
                    <div></div> 
                    <div></div>

                    <div className={styles.header__section} onClick={() => handleSort('servers')}>
                        Servers Online
                        <img src={arrow} alt="arrow" style={getArrowStyle('servers')} />
                    </div>
                    
                    <div className={styles.header__section} onClick={() => handleSort('players')}>
                        Players Online
                        <img src={arrow} alt="arrow" style={getArrowStyle('players')} />
                    </div>
                </div>

                <div 
                    className={styles.tableBody} 
                    style={{ 
                        opacity: isFetching ? 0.6 : 1, 
                        transition: 'opacity 0.15s ease' 
                    }}
                >
                    {data.gamesList.map((game) => (
                        <GameRow 
                            key={game.id} 
                            appid={game.appid}
                            id={game.id}
                            name={game.name}
                            servers={game.servers}
                            players={game.players}
                            image={game.image_link || ''}
                            graphData={game.hourly_online || []}
                        />
                    ))}
                </div>
            </div>

            {data.total > 0 && (
                <div className={styles.pagination}>
                    <div className={styles.pagination__control}>
                        <button 
                            className={styles.navBtn} 
                            onClick={() => setPage(p => p - 1)} 
                            disabled={page === 1}
                        > ‹ </button>
                        
                        <span className={styles.range}>
                            {(page - 1) * data.limit + 1}-{Math.min(page * data.limit, data.total)}
                        </span>

                        <button 
                            className={styles.navBtn} 
                            onClick={() => setPage(p => p + 1)}
                            disabled={page >= totalPages}
                        > › </button>
                    </div>
                    
                    <span className={styles.total}>{data.total.toLocaleString('en-US')}</span>
                </div>
            )}          
        </div>
    );
};