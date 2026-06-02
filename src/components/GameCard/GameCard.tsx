import type React from 'react';
import styles from './GameCard.module.scss'
import serversIcon from '../../img/svg/servers.svg'
import ServerGraph from '../ServerGraph/ServerGraph';
import { useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);


    const handleImageLoad = () => setIsLoading(false);
    return (
        <Link to={`/games/${appid}`}>
            <div className={styles.card}>
                <div className={styles.card_imageWrapper}>
                    <img
                        src={image}
                        alt={title}
                        className={styles.card__image}
                        onLoad={handleImageLoad}
                    />
                    {isLoading && <div className={`${styles.skeleton} ${styles.fullWidthHeight}`}></div>}
                </div>
                <div className={styles.card__content}>
                    {isLoading ? (
                        <>
                            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
                            <div className={`${styles.skeleton} ${styles.skeletonGraph}`} />
                            <div className={`${styles.skeleton} ${styles.skeletonFooter}`} />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}

                </div>
            </div>
        </Link>
        
    )
}

export default GameCard