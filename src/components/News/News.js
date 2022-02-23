import React from 'react';
import styles from './News.module.css'
import { FaRegClock, FaHeart, FaRegHeart } from 'react-icons/fa';


const News = ({ title, creation_time, author }) => {
    if (!title) {
        return '';
    }
    return (
        <div className={styles.cards}>
            <div className={styles.colLeft}>
                <div className={styles.time}>
                    <FaRegClock />
                    <p>{creation_time} by {author}</p>

                </div>
                <div className="title">
                    {title}
                </div>
            </div>
            <div className={styles.colRight}>
                <FaRegHeart style={{ color: "#DD0031", fontSize: "25px" }}

                />
            </div>
        </div>
    )
}

export default News