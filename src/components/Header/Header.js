import React from 'react'

import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.nav}>
            <h1 className={styles.logo}>HACKER NEWS</h1>
        </div>
    )
}

export default Header