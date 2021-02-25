
import React from 'react'
import queryString from 'query-string'
import { getComments } from '../utils/api'
import Loading from './Loading'
import parse from 'html-react-parser';


function Comments(props) {
    const { comments } = props;
    console.table(comments)

    function test(text) {
        if (text !== undefined && text.length) {
            return parse(text)
        }
        else {
            return <p></p>
        }

    }

    return (
        <ul>
            {comments.map((comment, index) => {

                if (comment !== null) {

                    const { by, id, parent, text, time, type, kids } = comment
                    let date = new Date(time * 1000).toLocaleDateString()
                    let hours = new Date(time * 1000).toLocaleTimeString()


                    return (
                        <li className='comment' key={index}>
                            <div className='meta-info-light'>
                                <span> by <a href='#'>{by}</a></span>
                                <span> on  {date}, {hours} </span>
                                <div>{test(text)}</div>
                            </div>
                        </li>

                    )
                }
                else {
                    return console.log(`a value was null on index ${index}`)
                }

            }

            )}
        </ul>
    )
}


export default class Post extends React.Component {

    state = {
        comments: [],
        error: null
    }

    componentDidMount() {
        this.fetchComments()
    }

    fetchComments = () => {
        const { id } = queryString.parse(this.props.location.search)
        getComments(id).then(result => this.setState({
            comments: result
        })).catch(() => {
            console.warn('Error fetching posts')
            this.setState({
                error: 'A NetworkError occured while attempting to fetch resource.'
            })
        })
    }

    isLoading = () => {
        const { comments, error } = this.state

        return !comments.length && error === null;
    }


    render() {
        const { comments, error } = this.state;

        return (
            <React.Fragment>
                { this.isLoading() && <Loading text='Fetching comments' />}
                { error && <p className='center-text error'>{error}</p>}
                <div>
                    <h1>Comments:</h1>
                    {comments.length > 0 && <Comments comments={comments} />}
                </div>
            </React.Fragment>
        )
    }

}