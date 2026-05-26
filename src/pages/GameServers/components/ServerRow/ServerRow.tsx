import type React from "react";
import styles from "./ServerRow.module.scss";
import ServerGraph from '../../../../components/ServerGraph/ServerGraph'; 

interface ServerRowProps {
    rank: number;
    name: string;
    players: string;
    address: string;
    graphData?: number[];
}

export const ServerRow: React.FC<ServerRowProps> = ({ rank, name, players, address, graphData = [40, 35, 45, 30, 50, 48] }) => {
    return (
        <div className={styles.row}>
            <div className={styles.rank}>#{rank}</div>
            <div className={styles.serverName}>{name}</div>
            
            <div className={styles.graphContainer}>
                <ServerGraph data={graphData} />
            </div>
            
            <div className={styles.players}>{players}</div>
            <div className={styles.address}>{address}</div>
        </div>
    );
};