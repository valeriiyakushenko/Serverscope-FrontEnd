import type React from "react";
import { useState } from "react";
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

export const ServerRow: React.FC<ServerRowProps> = ({ id, rank, name, players, address, graphData }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();  // Блокуємо перехід за посиланням Link
        e.stopPropagation(); // Зупиняємо спливання події до Link
        
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Повертаємо іконку через 2 секунди
        } catch (err) {
            console.error("Failed to copy address: ", err);
        }
    };

    return (
        <Link to={`/servers/${id}`} className={styles.rowLink}>
            <div className={styles.row}>
                <div className={styles.rank}>#{rank}</div>
                <div className={styles.serverName}>{name}</div>
                
                <div className={styles.graphContainer}>
                    <ServerGraph data={graphData || []} />
                </div>
                
                <div className={styles.players}>{players}</div>
                
                <div className={`${styles.address} ${styles.addressCell}`}>
                    <span className={styles.addressText}>{address}</span>
                    <button 
                        onClick={handleCopy} 
                        className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
                        title="Copy to clipboard"
                    >
                        {copied ? "Copied!" : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </Link>
    );
};