import { useGetGamesQuery } from '../../services/gamesApi';
import ServerStatus from '../../components/ServerStatus/ServerStatus';
import GameCard from '../../components/GameCard/GameCard';
import styles from './Home.module.scss';
import featuredIcon from '../../img/svg/featured.svg';

function Home() {
    const { data, isLoading, error } = useGetGamesQuery({
        page: 1,
        sortBy: 'players',
        sortOrder: 'desc',
        search: ''
    });

    const games = data?.gamesList || [];
    const topSixGames = games.slice(0, 6);
    
    const totalOnline = games.reduce((sum: number, game: any) => sum + (game.players || 0), 0);

    if (isLoading) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.loader}>Loading games analytics...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.error}>Failed to load server infrastructure data.</div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <header className={styles.homeHeader}>
                <h3 className={styles.homeHeader__title}>ADVANCED SERVER ANALYTICS</h3>
                <h1 className={styles.homeHeader__description}>
                    Find the right server with real time data that is always up to date
                </h1>
                <p className={styles.homeHeader__info}>
                    Explore player activity, trends, and performance across games
                </p>

                <ServerStatus count={totalOnline} />
            </header>
            
            <main className={styles.homeMain}>
                <h3 className={styles.homeMain__featuredIcon}>
                    <img src={featuredIcon} alt="featuredIcon" />
                    Featured Servers
                </h3>

                <div className={styles.homeMain__gamesGrid}>
                    {topSixGames.map((game: any) => {
                        const gameImage = typeof game.image_link === 'string' && game.image_link;

                        return (
                            <GameCard
                                id={game.id}
                                appid={game.appid}
                                key={game.id}
                                title={game.name}
                                image={gameImage}
                                graphData={game.hourly_online && game.hourly_online.length > 0 
                                    ? game.hourly_online 
                                    : [100, 120, 110, 140, 130, 160, 150]}
                                serversCount={game.servers || 0}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default Home;