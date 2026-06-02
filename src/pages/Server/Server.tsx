import type React from "react";
import gameIcon from '../../img/svg/game.svg'
import settingIcon from '../../img/svg/setting.svg'
import mapIcon from '../../img/svg/map.svg'
import styles from './Server.module.scss'
import { useParams } from "react-router-dom";
import { useGetServerByIdQuery, useGetServerChartQuery, useGetServerRankChartQuery, useGetServerUptimeChartQuery } from "../../services/serverApi";
import { useGetGameByIdQuery } from "../../services/gamesApi";
import { useState } from "react";
import { ServerChart } from "./component/ServerChart/ServerChart";

const PERIOD_TABS = [
    { label: "1D", value: "24h" },
    { label: "3D", value: "3d" },
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
] as const;


export const Server: React.FC = () => {

    const {id} = useParams<{id: string}>();
    const [selectedPeriod, setSelectedPeriod] = useState<"24h" | "3d" | "7d" | "30d">("24h");

    const {data: server, isLoading, error} = useGetServerByIdQuery(id || '');

    const { data: chartData, isLoading: isChartLoading } = useGetServerChartQuery(
        { id: id || '', period: selectedPeriod },
        { skip: !id }
    );

    const { data: rankChartData, isLoading: isRankChartLoading } = useGetServerRankChartQuery(
        { id: id || '', period: selectedPeriod === "24h" ? "3d" : selectedPeriod},
        { skip: !id }
    );

    const { data: uptimeChartData, isLoading: isUptimeLoading } = useGetServerUptimeChartQuery(
        { id: id || '', period: selectedPeriod },
        { skip: !id }
    );
        
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
                    <p className={styles.description}>Current map</p>
                </div>
            </div>

            <div className={styles.mainContent}>
                <section className={styles.analytics}>
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsHeader}>
                            <h2 className={styles.analyticsTitle}>Server Analytics & Performance Metrics</h2>
                            
                            <div className={styles.periodTabs}>
                                {PERIOD_TABS.map((tab) => (
                                    <button
                                        key={tab.label}
                                        className={`${styles.tabButton} ${selectedPeriod === tab.value ? styles.activeTab : ""}`}
                                        onClick={() => setSelectedPeriod(tab.value)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.chartWrapper}>
                            <h3 className={styles.chartTitle}>Players count</h3>
                            {isChartLoading ? (
                                <div className={styles.chartLoader}>Loading chart...</div>
                            ) : chartData?.points && chartData.points.length > 0 ? (
                                <ServerChart 
                                    data={chartData.points} 
                                    dataKey="players" 
                                    timeRange={selectedPeriod === "24h" ? "24h" : "3d"}
                                    lineColor="#E5FF9C"
                                />
                            ) : (
                                <div className={styles.chartError}>No player statistics available</div>
                            )}
                        </div>

                        <div className={styles.chartWrapper}>
                            <h3 className={styles.chartTitle}>Server Rank</h3>
                            {isRankChartLoading ? (
                                <div className={styles.chartLoader}>Loading chart...</div>
                            ) : rankChartData?.points && rankChartData.points.length > 0 ? (
                                <ServerChart 
                                    data={rankChartData.points} 
                                    dataKey="rank"
                                    timeRange={selectedPeriod}
                                    lineColor="#4FACFE"
                                />
                            ) : (
                                <div className={styles.chartError}>No rank statistics available</div>
                            )}
                        </div>

                        <div className={styles.chartWrapper}>
                            <h3 className={styles.chartTitle}>Server Uptime</h3>
                            {isUptimeLoading ? (
                                <div className={styles.chartLoader}>Loading uptime chart...</div>
                            ) : uptimeChartData?.points && uptimeChartData.points.length > 0 ? (
                                <ServerChart 
                                    data={uptimeChartData.points} 
                                    dataKey="uptimeRatio"
                                    timeRange={selectedPeriod}
                                    lineColor="#00E676"
                                />
                            ) : (
                                <div className={styles.chartError}>No uptime statistics available</div>
                            )}
                        </div>
                    </div>    
                </section>

                <aside className={styles.serverInfo}>
                    <div className={styles.infoRow}>
                        <p className={styles.label}>Rank:</p>
                        <p className={styles.value}>#{server.rank}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p className={styles.label}>Player count:</p>
                        <p className={styles.value}>{server.players}/{server.maxPlayers}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p className={styles.label}>Game Port:</p>
                        <p className={styles.value}>{server.ip}:{server.gamePort}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p className={styles.label}>Query Port:</p>
                        <p className={styles.value}>{server.ip}:{server.queryPort}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p className={styles.label}>Status:</p>
                        <p className={styles.value_status}>{server.isOnline ? "Online" : "Offline"}</p>
                    </div>
                     <div className={styles.infoRow}>
                        <p className={styles.label}>Popularity:</p>
                        <p className={styles.value}>{server.popularity || "Low"}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p className={styles.label}>Stability:</p>
                        <p className={styles.value}>{Math.round(server.stability * 100)}%</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}