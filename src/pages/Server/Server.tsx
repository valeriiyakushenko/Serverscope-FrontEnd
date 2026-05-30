import type React from "react";
import gameIcon from '../../img/svg/game.svg'
import settingIcon from '../../img/svg/setting.svg'
import mapIcon from '../../img/svg/map.svg'
import styles from './Server.module.scss'
import { useParams } from "react-router-dom";
import { useGetServerByIdQuery } from "../../services/serverApi";
import { useGetGameByIdQuery } from "../../services/gamesApi";


export const Server: React.FC = () => {

    const {id} = useParams<{id: string}>();

    const {data: server, isLoading, error} = useGetServerByIdQuery(id || '');
    
    const {data: game, isLoading: isGameLoading} = useGetGameByIdQuery(server?.appid || 0, {
        skip: !server?.appid
    })

    if (isLoading || isGameLoading) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.loader}>Loading server details...</div>
            </div>
        )
    }

    if (error || !server) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.error}>Server not found or API error.</div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.serverTitle}>{server.name}</h1>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statsCard}>
                    <div className={styles.header}>
                        <img src={gameIcon} alt="gameIcon" />
                        <p className={styles.title}>GAME</p>
                    </div>
                    <h3 className={styles.name}>{game?.name || "Unknown game"}</h3>
                    <p className={styles.description}>{server.players}/{server.maxPlayers} players</p>
                </div>

                <div className={styles.statsCard}>
                    <div className={styles.header}>
                        <img src={settingIcon} alt="settingIcon" />
                        <p className={styles.title}>MODDED</p>
                    </div>
                    <h3 className={styles.name}>No modded</h3>
                    <p className={styles.description}>Current mode</p>
                </div>

                <div className={styles.statsCard}>
                    <div className={styles.header}>
                        <img src={mapIcon} alt="mapIcon" />
                        <p className={styles.title}>MAP</p>
                    </div>
                    <h3 className={styles.name}>{server?.map || "No map 👀"}</h3>
                    <p className={styles.description}>{server.players}/{server.maxPlayers} players</p>
                </div>
            </div>
        </div>
    )
}