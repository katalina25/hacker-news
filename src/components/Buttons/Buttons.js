import styles from './Buttons.module.css';
import { Link, useLocation } from 'react-router-dom'

const Buttons = () => {
    let activeBtnFav = false;
    useLocation().pathname === "/Favs" ? activeBtnFav = true : activeBtnFav = false;

    return (
        <>
            <div className={styles.filtersContainer}>
                <div className={styles.allAndFavs}>
                    <Link to='/' className={styles.link}>
                        <div className={`${activeBtnFav === false ? styles.active : ''}`}>
                            All
                        </div>
                    </Link>
                    <Link to='/Favs' className={styles.link} >
                        <div className={`${activeBtnFav && styles.active}`}>
                            My Faves
                        </div>
                    </Link>
                </div>


            </div>
        </>
    )
}

export default Buttons
