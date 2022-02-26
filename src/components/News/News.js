import React from 'react';
import styles from './News.module.css'
import ReactTimeAgo from 'react-time-ago';
import { FaRegClock, FaRegHeart } from 'react-icons/fa';


const News = ({ title, creation_time, author, url, objectID }) => {
    if (!title) {
        return '';
    }
    const handleClick = (url) => {
        window.open(url);
    }
    const addFavorite = (id) => {
        alert(id);
    }
    return (
        <div className={styles.cards} >
            <div className={styles.colLeft} onClick={() => handleClick(url)}>
                <div className={styles.time}>

                    <FaRegClock />
                    <p><ReactTimeAgo date={creation_time} locale="en-US" /> by {author}</p>

                </div>
                <div className={styles.title}>
                    {title}
                </div>
            </div>
            <div className={styles.colRight}>
                <FaRegHeart style={{ color: "#DD0031", fontSize: "25px", cursor: 'pointer' }}
                    onClick={() => addFavorite(objectID)}
                />
            </div>
        </div>
    )
}

export default News