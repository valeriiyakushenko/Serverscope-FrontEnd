import React, { useEffect, useState } from "react"
import { useGetGamesQuery } from "../../services/gamesApi"
import styles from './GamesTable.module.scss'
import { GameRow } from "../GameRow/GameRow"
import arrow from '../../img//svg/arrow-right.svg'

interface GamesTableProps {
    searchTerm: string;
    onStatsCalculated: (stats: { totalServers: number; gamesTracked: number; totalPlayers: number }) => void;
}

export const GamesTable: React.FC<GamesTableProps> = ({searchTerm, onStatsCalculated}) => {
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('players');

    useEffect(() => {
        setPage(1);
    }, [searchTerm]) 

    


    const {data, isLoading} = useGetGamesQuery({page, sortBy, search: searchTerm});

    useEffect(() => {
        if (data && data.summaryStats) {
            onStatsCalculated(data.summaryStats)
        }
    }, [data, onStatsCalculated])

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data available</div>

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.header__section} onClick={() => setSortBy('name')}>Games

                        <img src={arrow} alt="arrow"/>
                    </div>
                    <div className={styles.header__section}  onClick={() => setSortBy('servers')}>Servers Online
                        <img src={arrow} alt="arrow"/>
                    </div>
                    <div className={styles.header__section}  onClick={() => setSortBy('players')}>Players Online
                        <img src={arrow} alt="arrow"/>
                    </div>
                </div>

                {data.games.map(game => <GameRow key={game.id} {...game}/>)}
            </div>

            <div className={styles.pagination}>
                <div className={styles.pagination__control}>
                    <button 
                        className={styles.navBtn} 
                        onClick={() => setPage(p => p - 1)} 
                        disabled={page === 1}
                    > ‹ </button>
                    
                    <span className={styles.range}>
                        {(page - 1) * 15 + 1}-{page * 15}
                    </span>

                    <button 
                        className={styles.navBtn} 
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= data.totalPages}
                    > › </button>
                </div>
                

                <span className={styles.total}>{data.totalCount?.toLocaleString('en-US')}</span>
            </div>
        </div>
    )
}