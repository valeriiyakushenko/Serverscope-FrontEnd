import type React from "react";
import styles from "./ServerRow.module.scss";
import ServerGraph from '../../../../components/ServerGraph/ServerGraph'; 
import { Link } from "react-router-dom";

interface ServerRowProps {
    id: number;
    rank: number;
    name: string;
    players: string;
    address: string;
    graphData?: number[];
}

export const ServerRow: React.FC<ServerRowProps> = ({ id, rank, name, players, address, graphData}) => {
    return (
        <Link to={`/servers/${id}`} className={styles.rowLink}>
            <div className={styles.row}>
                <div className={styles.rank}>#{rank}</div>
                <div className={styles.serverName}>{name}</div>
                
                <div className={styles.graphContainer}>
                    <ServerGraph data={graphData} />
                </div>
                
                <div className={styles.players}>{players}</div>
                <div className={styles.address}>{address}</div>
            </div>
        </Link>
        
    );
};