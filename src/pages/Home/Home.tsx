import ServerStatus from '../../components/ServerStatus/ServerStatus'
import styles from './Home.module.scss'
import featuredIcon from '../../img/svg/featured.svg'

import cs2 from '../../img/game/cs.png'
import GameCard from '../../components/GameCard/GameCard'


const GAME_DATA = [
    { id: 1, title: 'Counter-Strike 2', image: cs2, graphData: [100, 120, 110, 140, 130, 160, 150, 100, 120, 110, 140,], servers: 178509 },
    { id: 2, title: 'DayZ', image: cs2, graphData: [80, 90, 100, 110, 95, 105, 120, 100, 120, 110, 140], servers: 450002 },
    { id: 3, title: 'Rust', image: cs2, graphData: [150, 140, 130, 160, 100, 120, 110, 140, 170, 155, 160], servers: 79097 },
    { id: 4, title: 'Arma 3', image: cs2, graphData: [50, 60, 55, 70, 65, 100, 120, 110, 140, 80, 75], servers: 61943 },
    { id: 5, title: 'Unturned', image: cs2, graphData: [120, 100, 120, 110, 140, 110, 130, 140, 125, 135, 130], servers: 49043 },
    { id: 6, title: 'Day of Dragons', image: cs2, graphData: [30, 40, 35, 45, 120, 100, 120, 110, 40, 50, 45], servers: 37033 },
];

function Home() {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.homeHeader}>
                <h3 className={styles.homeHeader__title}>ADVANCED SERVER ANALYTICS</h3>
                <h1 className={styles.homeHeader__description}>Find the right server with real time data
                    that is always up to date</h1>
                <p className={styles.homeHeader__info}>Explore player activity, trends, and performance across games</p>

                <ServerStatus count={1875203} />
            </header>
            <main className={styles.homeMain}>
                <h3 className={styles.homeMain__featuredIcon}>
                    <img src={featuredIcon} alt="featuredIcon" />
                    Featured Servers
                </h3>

                <div className={styles.homeMain__gamesGrid}>
                    {GAME_DATA.map((game) => (
                        <GameCard
                            id={game.id}
                            key={game.id}
                            title={game.title}
                            image={game.image}
                            graphData={game.graphData || []}
                            serversCount={game.servers}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Home