import type React from 'react';
import styles from './GameCard.module.scss'
import serversIcon from '../../img/svg/servers.svg'
import ServerGraph from '../ServerGraph/ServerGraph';
import { Link } from 'react-router-dom';

interface GameCardProps {
    id: number;
    appid: number;
    title: string;
    image: string;
    graphData: number[];
    serversCount: number;
}

const GameCard: React.FC<GameCardProps> = ({id, appid, title, image, graphData, serversCount }) => {
    return (
        <Link to={`/games/${appid}`}>
            <div className={styles.card}>
                <div className={styles.card_imageWrapper}>
                    {image && <img src={image} alt={title} className={styles.card__image} />}
                </div>
                <div className={styles.card__content}>
                    <h4 className={styles.card__title}>{title}</h4>
                    <div className={styles.card__graph}>
                        <ServerGraph data={graphData} />
                    </div>
                    <div className={styles.card__footer}>
                        <img src={serversIcon} alt="serversIcon" />
                        <span className={styles.card__servers}>
                            {serversCount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
        
    )
}

export default GameCard