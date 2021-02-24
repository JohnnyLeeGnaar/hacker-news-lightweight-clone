import React from 'react';
import ReactDOM from 'react-dom';
import { getPosts } from '../utils/api'
import {Link} from 'react-router-dom'
import Loading from './Loading'
import Nav from './Nav'
import Post from './Post'


function PostsList({ posts }) {

    return (
        <ul>
            {posts.map((post, index) => {

                if (post !== null) {

                    const { by, descendants, id, kids, score, time, title, type, url, testis } = post
                    let date = new Date(time * 1000).toLocaleDateString()
                    let hours = new Date(time * 1000).toLocaleTimeString()


                    return (
                            <li className='post' key={index}>
                                <a className='link' href={url}>{title}</a>
                                <div className='meta-info-light'>
                                    <span> by <a href='#'>{by}</a></span>
                                    <span> on  {date}, {hours} </span>

                                    <span><Link
                                        to={{
                                            pathname: 'post',
                                            search: `id=${id}`
                                        }}>
                                        {descendants} comments</Link></span>
                                </div>
                            </li>

                    )

                    /*
                     <Route exact path='/roster' component={FullRoster}/>
                     <Route path='/roster/:number' component={Player}/>
            */
                }
                else {
                    return console.log(`a value was null on index ${index}`)
                }

            }

            )}
        </ul>
    )
}

export default class Posts extends React.Component {

    state = {
        type: 'topstories',
        posts: [],
        error: null
    }

    componentDidMount() {

        this.setState({
            type: this.props.post
        })
        this.fetchPosts();

    }

    componentDidUpdate(prevState) {


        if (prevState.post !== this.props.post) {
            this.setState({
                posts: [],
                type: this.props.post
            }, () => this.fetchPosts())
        }
    }

    fetchPosts = () => {

        const { type } = this.state;
        this.setState({
            type: null,
            posts: []
        }, () => getPosts(type).then((result) => this.setState({ posts: result, type: this.props.post }))
            .catch(() => {
                console.warn('Error fetching posts')
                this.setState({
                    error: 'Error fetching posts'
                })
            }))

    }

    isLoading = () => {
        const { posts, error } = this.state

        return !posts.length && error === null;
    }

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
