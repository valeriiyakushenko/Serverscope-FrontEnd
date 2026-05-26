import styles from './ServerStatus.module.scss'

interface ServerStatusProps {
    count: number;
}

const ServerStatus: React.FC<ServerStatusProps> = ({ count }) => {

    const formatterCount = count.toLocaleString('uk-UA')

    return (
        <div className={styles.statusBadge}>
            <span className={styles.label}>Servers Online</span>
            <span className={styles.count}>{formatterCount}</span>
        </div>
    )
}

export default ServerStatus