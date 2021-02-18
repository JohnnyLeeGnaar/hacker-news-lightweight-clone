import React from 'react';
import ReactDOM from 'react-dom';
import { getPosts } from '../utils/api'
import Loading from './Loading'
import Nav from './Nav'


function PostsList({ posts }) {

    console.table(posts);

    return (
        <ul>
            {posts.map((post, index) => {
                const { by, descendants, id, kids, score, time, title, type, url } = post
                let date = new Date(time * 1000).toLocaleDateString()
                let hours = new Date(time * 1000).toLocaleTimeString()


                return (
                        <li className='post' key={index}>
                            <a className='link' href={url}>{title}</a>
                            <div className='meta-info-light'>
                                <span> by <a href='#'>{by}</a></span>
                                <span> on  {date}, {hours}</span>
                                <span> with <a href='#'>{descendants}</a> comments</span>
                            </div>
                        </li>

                )

            })}
        </ul>
    )
}
/* var date_test = new Date("2011-07-14 11:23:00".replace(/-/g,"/"));
console.log(date_test); */
////by, descendants, id, kids, score, time, title, type, url

export default class Posts extends React.Component {

    state = {
        posts: [],
        error: null
    }

    componentDidMount() {
        getPosts().then((result) => this.setState({ posts: result }))
            .catch(() => {
                console.warn('Error fetching posts')
                this.setState({
                    error: 'Error fetching posts'
                })
            })

    }

    isLoading = () => {
        const { posts, error } = this.state

        return !posts.length && error === null;
    }

    /* .then((data) => this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          })))*/



    render() {
        const { posts, error } = this.state;
        return (
            <React.Fragment>
                {this.isLoading() && <Loading />}
                {error && <p className='center-text error'>{error}</p>}
                <div>
                    <h1>Posts:</h1>
                    {posts.length > 0 && <PostsList posts={posts} />}
                </div>
            </React.Fragment>

        )
    }
}

/* {posts.map((post, index) => {
                        return (
                            <li key={index}>
                                {post}
                            </li>
                        )
                    })}*/