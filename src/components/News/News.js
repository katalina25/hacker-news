import React from 'react';
import styles from './News.module.css'
import { FaRegClock, FaHeart, FaRegHeart } from 'react-icons/fa';


const News = ({ title, creation_time, author, url }) => {
    if (!title) {
        return '';
    }
    const handleClick = (url) => {
        url ? window.open(url) : alert("This Article is not available right now");
    }
    return (
        <div className={styles.cards} >
            <div className={styles.colLeft} onClick={() => handleClick(url)}>
                <div className={styles.time}>
                    <FaRegClock />
                    <p>{creation_time} by {author}</p>

                </div>
                <div className={styles.title}>
                    {title}
                </div>
            </div>
            <div className={styles.colRight}>
                <FaRegHeart style={{ color: "#DD0031", fontSize: "25px", cursor: 'pointer' }}

                />
            </div>
        </div>
    )
}

export default News