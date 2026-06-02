import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { Button } from '../../components/ui/Button/Button'

function Navbar() {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
            <div className={styles.navbar_logo}>
                <p>ServerScope</p>
            </div>

            <div className={styles.navigation}>
                <ul className={styles.navbar_menu}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/games'>Games</Link></li>
                    <li className={styles.disabledItem}>
                        <Link 
                            to="/" 
                            className={styles.disabledLink} 
                            onClick={(e) => e.preventDefault()}
                        >
                            Search
                        </Link>
                    </li>
                    <li className={styles.disabledItem}>
                        <Link 
                            to="/" 
                            className={styles.disabledLink} 
                            onClick={(e) => e.preventDefault()}
                        >
                            Charts
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={styles.navbar_auth}>
                <div className={styles.navbar_button}>
                    <Button variant='secondary'>Log in</Button>
                    <Button>Sign up</Button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar