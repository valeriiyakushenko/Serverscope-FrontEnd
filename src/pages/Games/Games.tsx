import React, { useState } from 'react'
import styles from './Games.module.scss'
import { GamesTable } from '../../components/GamesTable/GamesTable';
import searchIcon from '../../img/svg/search-normal.svg'
import driver from '../../img/svg/driver.svg'

interface TableStats {
  totalServers: number;
  gamesTracked: number;
  totalPlayers: number;
}

function Games() {
  const [searchTerm, setSearchTerm] = useState("");

  const [stats, setStats] = useState<TableStats> (
    {
      totalServers: 0,
      gamesTracked: 0,
      totalPlayers: 0,
    }
  )


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }


  return (
    <div className={styles.pageContainer}>
        <header className={styles.gamesHeader}>
            <div className={styles.gamesHeader__title}>
                <h2>Find your perfect server</h2>
                <p>Thousands of servers online. Real-time data. Live players.</p>
            </div>

            <div className={styles.searchContainer}>
                <input 
                  type="text" 
                  className={styles.searchInput}
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <img src={searchIcon} alt="searchIcon" />
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statCard__label}>Total Servers</span>
                <div className={styles.value_container}>
                  <img src={driver}/>
                  <span className={styles.statCard__value}>{stats.totalServers.toLocaleString('en-US')}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statCard__label}>Games Tracked</span>
                <div className={styles.value_container}>
                  <img src={driver}/>
                  <span className={styles.statCard__value}>{stats.gamesTracked.toLocaleString('en-US')}</span>
                </div>
                
              </div>
              <div className={styles.statCard}>
                <span className={styles.statCard__label}>Total Players</span>
                <div className={styles.value_container}>
                  <img src={driver}/>
                  <span className={styles.statCard__value}>{stats.totalPlayers.toLocaleString('en-US')}</span>
                </div>
                
              </div>
              <div className={styles.statCard}>
                <span className={styles.statCard__label}>Tracking Update</span>
                <div className={styles.value_container}>
                  <img src={driver}/>
                  <span className={styles.statCard__value}>11,402</span>
                </div>
              </div>
            </div>
        </header>

        <main className={styles.mainContent}>
            <GamesTable searchTerm={searchTerm} onStatsCalculated={setStats}/>
        </main>
    </div>
  )
}

export default Games