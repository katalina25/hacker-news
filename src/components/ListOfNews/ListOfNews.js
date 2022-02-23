import React, { Component } from 'react';
import News from '../News/News';
import axios from "axios";
import styles from './ListOfNews.module.css'

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
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${page}&hitsPerPage=8`)
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
                <div className={styles.newsContainer}>

                    {this.state.news.map(news => (
                        <News id={news.objectID} title={news.story_title} creation_time={news.created_at} author={news.author} />
                    ))}


                </div>
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span style={loadingTextCSS}>Cargando Noticias...</span>
                </div>
            </>
        )
    }
}

export default ListOfNews