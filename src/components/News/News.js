import React from 'react';
import styles from './News.module.css'
import { FaRegClock, FaRegHeart } from 'react-icons/fa';


const News = ({ title, creation_time, author, url }) => {
    if (!title) {
        return '';
    }
    const handleClick = (url) => {
        window.open(url);
    }
    return (
        <div className={styles.cards} >
            <div className={styles.colLeft} onClick={() => handleClick(url)}>
                <div className={styles.time}>
                    <FaRegClock />
                    <p>Created on {Date(creation_time)} by {author}</p>

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