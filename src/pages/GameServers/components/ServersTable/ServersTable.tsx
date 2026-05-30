import React from "react";
import styles from "./ServersTable.module.scss";
import { ServerRow } from "../ServerRow/ServerRow";
import arrow from "../../../../img/svg/arrow-right.svg";

interface ServerItem {
    id: number;
    rank: number;
    name: string;
    players: string;
    address: string;
}

interface ServersTableProps {
    serversList: ServerItem[];
    totalCount: number;
    page: number;
    onChangePage: (page: number) => void;
    sortBy: string;
    sortOrder: "asc" | "desc";
    onChangeSort: (field: string, nextOrder: "asc" | "desc") => void;
}

export const ServersTable: React.FC<ServersTableProps> = ({ 
    serversList, 
    totalCount, 
    page, 
    onChangePage, 
    sortBy, 
    sortOrder, 
    onChangeSort 
}) => {
    const itemsPerPage = 15;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handleSortClick = (field: string) => {
        if (sortBy === field) {
            const nextOrder = sortOrder === "asc" ? "desc" : "asc";
            onChangeSort(field, nextOrder);
        } else {
            onChangeSort(field, "desc");
        }
    };

    const getArrowStyle = (field: string) => {
        if (sortBy !== field) return { transform: "none", opacity: 0.3, transition: "transform 0.2s, opacity 0.2s" };
        
        const rotation = sortOrder === "desc" ? "rotate(90deg)" : "rotate(270deg)";
        return {
            transform: rotation,
            color: "#C9FE37",
            transition: "transform 0.2s"
        };
    };

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.header__section} onClick={() => handleSortClick("rank")}>
                        Rank
                        <img src={arrow} alt="arrow" style={getArrowStyle("rank")} />
                    </div>
                    <div className={styles.header__section} onClick={() => handleSortClick("name")}>
                        Server Name
                        <img src={arrow} alt="arrow" style={getArrowStyle("name")} />
                    </div>
                    
                    <div></div>
                    
                    <div className={styles.header__section} onClick={() => handleSortClick("players")}>
                        Players Online
                        <img src={arrow} alt="arrow" style={getArrowStyle("players")} />
                    </div>
                    <div className={styles.header__section}>
                        Address
                    </div>
                </div>

                <div className={styles.tableBody}>
                    {serversList && serversList.length > 0 ? (
                        serversList.map((server) => {
                            return (
                                <ServerRow 
                                    key={server.id} 
                                    {...server} 
                                />
                            );
                        })
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
                            onClick={() => onChangePage(page - 1)}
                            disabled={page === 1}
                        > ‹ </button>
                        
                        <span className={styles.range}>
                            {(page - 1) * itemsPerPage + 1}-{Math.min(page * itemsPerPage, totalCount)}
                        </span>

                        <button 
                            className={styles.navBtn} 
                            onClick={() => onChangePage(page + 1)}
                            disabled={page >= totalPages}
                        > › </button>
                    </div>
                    
                    <span className={styles.total}>{totalCount.toLocaleString('en-US')}</span>
                </div>
            )}
        </div>
    );
};