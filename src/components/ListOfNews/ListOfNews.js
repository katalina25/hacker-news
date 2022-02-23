import React, { Component } from 'react';
import News from '../News/News';
import axios from "axios";
import styles from './ListOfNews.module.css';
import Select from 'react-select';
import { FaAngular, FaReact, FaVuejs } from 'react-icons/fa';

const options = [
    {
        value: 'angular', label: <>
            <FaAngular style={{ color: "#DF0031", fontSize: "25px", paddingRight: "5px" }} />  Angular
        </>
    },
    {
        value: 'react', label: <>
            <FaReact style={{ color: "#4FE7FD", fontSize: "25px", paddingRight: "5px" }} />  React
        </>
    },
    {
        value: 'vuejs', label: <>
            <FaVuejs style={{ color: "#41B984", fontSize: "25px", paddingRight: "5px" }} />  Vuejs
        </>
    },

]


export class ListOfNews extends Component {

    constructor() {
        super();
        this.state = {
            news: [],
            loading: false,
            page: 0,
            prevY: 0,
        };
    }
    componentDidMount() {
        this.getNews(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);

    }
    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const curPage = this.state.page + 1;
            this.getNews(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    getNews(page) {

        this.setState({ loading: true });
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${page}&hitsPerPage=10`)
            .then(res => {
                this.setState({
                    news: [...this.state.news, ...res.data.hits]
                });
                this.setState({
                    loading: false
                });
            })


    }

    render() {


        const loadingCSS = {
            height: "100px",
            margin: "30px"
        }
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <>
                <div className={styles.filtersContainer}>
                    <div className={styles.allAndFavs}>
                        <div className={styles.active}>All</div>
                        <div className={styles.myFavs}>My Faves</div>
                    </div>
                    <div className={styles.selectInput}>

                        <Select options={options} />
                    </div>


                </div>
                <div className={styles.newsContainer}>

                    {this.state.news.filter(function (news) {
                        if (news.author && news.story_title && news.story_url && news.created_at) {
                            return news;
                        } else {
                            return false;
                        }
                    })




                        .map(news => (
                            <News key={news.objectID} title={news.story_title} creation_time={news.created_at} author={news.author} url={news.story_url} />
                        ))}


                </div>
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span className={styles.loadingTextCSS} style={loadingTextCSS}>Loading News...</span>
                </div>
            </>
        )
    }
}

export default ListOfNews