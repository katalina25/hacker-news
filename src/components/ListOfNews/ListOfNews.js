import React, { Component } from 'react';
import News from '../News/News';
import axios from "axios";
import Select from 'react-select';
import styles from './ListOfNews.module.css';
import { FaAngular, FaReact, FaVuejs } from 'react-icons/fa';



export class ListOfNews extends Component {


    constructor() {
        super();
        this.state = {
            news: [],
            loading: false,
            page: 0,
            prevY: 0,
            selectedOption: null,
            url: "https://hn.algolia.com/api/v1/search_by_date?query=angular&hitsPerPage=10&page="

        };
    }
    componentDidMount() {
        this.getNews(this.state.page, this.state.url);

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
            this.getNews(curPage, this.state.url);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    getNews(page, url) {

        this.setState({ loading: true });
        axios.get(`${url}${page}`)
            .then(res => {
                this.setState({
                    news: [...this.state.news, ...res.data.hits]
                });
                this.setState({
                    loading: false
                });
            })


    }


    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            this.setState({ news: [], url: selectedOption.value }),
            this.getNews(0, selectedOption.value)
        );
    };

    options = [
        {
            value: 'https://hn.algolia.com/api/v1/search_by_date?query=angular&hitsPerPage=10&page=', label: <div className={styles.option}>
                <FaAngular style={{ color: "#DF0031", fontSize: "25px", paddingRight: "5px" }} />  Angular
            </div>
        },
        {
            value: 'https://hn.algolia.com/api/v1/search_by_date?query=reactjs&hitsPerPage=10&page=', label: <div className={styles.option}>
                <FaReact style={{ color: "#4FE7FD", fontSize: "25px", paddingRight: "5px" }} />  React
            </div>
        },
        {
            value: 'https://hn.algolia.com/api/v1/search_by_date?query=vuejs&hitsPerPage=10&page=', label: <div className={styles.option}>
                <FaVuejs style={{ color: "#41B984", fontSize: "25px", paddingRight: "5px" }} />  Vuejs
            </div>
        },


    ]
    render() {
        const { selectedOption } = this.state;


        const loadingCSS = {
            height: "100px",
            margin: "30px"
        }
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <>
                <div className={styles.selectInput}>

                    <Select
                        className={styles.selectCom}
                        options={this.options}
                        value={selectedOption}
                        onChange={this.handleChange}
                        placeholder={'Select your news...'}
                    />
                </div>



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