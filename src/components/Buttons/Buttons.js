import styles from './Buttons.module.css';
import { Link } from 'react-router-dom'

const Buttons = () => {

    return (
        <>
            <div className={styles.filtersContainer}>
                <div className={styles.allAndFavs}>
                    <Link to='/' className={styles.link}>
                        <div>
                            All
                        </div>
                    </Link>
                    <Link to='/Favs' className={styles.link}>
                        <div className={styles.active}>
                            My Faves
                        </div>
                    </Link>
                </div>


            </div>
        </>
    )
}

export default Buttons
