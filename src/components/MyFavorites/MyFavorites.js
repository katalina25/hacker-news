import React, { Component } from 'react';
import axios from "axios";
import News from '../News/News';

import styles from './MyFavorites.module.css';



export class MyFavorites extends Component {


    constructor() {
        super();
        this.state = {
            news: []

        };
    }
    componentDidMount() {
        // this.getNews(this.state.page);
        axios.get('https://hn.algolia.com/api/v1/search_by_date?query=angular&hitsPerPage=10&page=')
            .then((response) => {
                this.setState({ news: [...this.state.news, ...response.data.hits] })
            });
    }



    render() {

        return (
            <>

                <div className={styles.newsContainer}>

                    {this.state.news
                        .filter(function (news) {
                            if (news.author && news.story_title && news.story_url && news.created_at) {
                                return news;
                            } else {
                                return false;
                            }
                        })
                        .map(news => (
                            <News key={news.objectID} objectID={news.objectID} title={news.story_title} creation_time={news.created_at} author={news.author} url={news.story_url} />
                        ))
                    }


                </div>

            </>
        )
    }
}

export default MyFavorites