import React, { useState } from "react";
import styles from "./ServersTable.module.scss";
import { ServerRow } from "../ServerRow/ServerRow";
import arrow from "../../../../img/svg/arrow-right.svg";

interface ServerItem {
    rank: number;
    name: string;
    players: string;
    address: string;
}

interface ServersTableProps {
    serversList: ServerItem[];
}

export const ServersTable: React.FC<ServersTableProps> = ({ serversList }) => {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("rank");

    const totalCount = serversList?.length || 0;
    const itemsPerPage = 15;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.header__section} onClick={() => setSortBy("rank")}>
                        Rank
                        <img src={arrow} alt="arrow" style={{ transform: sortBy === 'rank' ? 'rotate(90deg)' : 'none' }} />
                    </div>
                    <div className={styles.header__section} onClick={() => setSortBy("name")}>
                        Server Name
                        <img src={arrow} alt="arrow" style={{ transform: sortBy === 'name' ? 'rotate(90deg)' : 'none' }} />
                    </div>
                    <div className={styles.header__section} onClick={() => setSortBy("players")}>
                        Players Online
                        <img src={arrow} alt="arrow" style={{ transform: sortBy === 'players' ? 'rotate(90deg)' : 'none' }} />
                    </div>
                    <div className={styles.header__section}>
                        Address
                    </div>
                </div>

                <div className={styles.tableBody}>
                    {serversList && serversList.length > 0 ? (
                        serversList.map((server) => (
                            <ServerRow key={server.rank} {...server} />
                        ))
                    ) : (
                        <div className={styles.noServers}>No active servers found.</div>
                    )}
                </div>
            </div>

            {totalCount > 0 && (
                <div className={styles.pagination}>
                    <div className={styles.pagination__control}>
                        <button 
                            className={styles.navBtn} 
                            onClick={() => setPage(p => p - 1)} 
                            disabled={page === 1}
                        > ‹ </button>
                        
                        <span className={styles.range}>
                            {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalCount)}
                        </span>

                        <button 
                            className={styles.navBtn} 
                            onClick={() => setPage(p => p + 1)}
                            disabled={page >= totalPages}
                        > › </button>
                    </div>
                    
                    <span className={styles.total}>{totalCount.toLocaleString('en-US')}</span>
                </div>
            )}
        </div>
    );
};