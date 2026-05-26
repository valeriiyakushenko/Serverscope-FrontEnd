import styles from './Footer.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__info}>
            <p>© ServerScope LLC. All rights reserved. All trademarks are property of their respective owners.</p>
            <p>Powered by Steam</p>
        </div>
        <div className={styles.footer__links}>
            <a href="#">Contact Us</a>
            <a href="#"> Add Server</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
        </div>
    </footer>
  )
}

export default Footer
