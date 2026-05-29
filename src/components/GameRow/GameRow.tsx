import type React from "react";
import styles from './GameRow.module.scss'
import { Link } from 'react-router-dom'
import ServerGraph from '../ServerGraph/ServerGraph';

interface GameRowProps {
    id: number;
    appid: number;
    image: string;
    name: string;
    servers: number;
    players: number;
    graphData: number[];
}

export const GameRow: React.FC<GameRowProps> = ({appid, image, name, servers, players, graphData}) => {

    const formatNumber = (num: number) => {
        return num.toLocaleString('en-US')
    }

    return (
        <Link to={`/games/${appid}`} className={styles.rowLink}>
            <div className={styles.row}>
                <div className={styles.imageContainer}>
                    <img src={image} alt={name} loading="lazy" />
                </div>
                <div className={styles.gameName}>
                    {name}
                </div>
                <div className={styles.graphContainer}>
                    <ServerGraph data={graphData} />
                </div>
                <div className={styles.count}>
                    {formatNumber(servers)}
                </div>

                <div className={styles.count}>
                    {formatNumber(players)}
            </div>
            </div>
        </Link>
        
    )
}