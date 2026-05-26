import BokehBackground from '../../components/BokehBackground/BokehBackground'
import SunBeams from '../../components/SunBeams/SunBeams'
import styles from './MainBackround.module.scss'

const MainBackround = () => {
  return (
    <div className={styles.backroundWrapper}>
      <BokehBackground />
      <SunBeams/>
      <div className={styles.ellipseContainer}>
        <div className={styles.sunBeam}></div>
      </div>
      <div className={styles.gridLines}></div>

    </div>
  )
}

export default MainBackround