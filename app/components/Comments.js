import React from 'react'
import { getComments } from '../utils/api'
import parse from 'html-react-parser';
import Loading from './Loading'


function parseComment(text) {
    if (text !== undefined && text.length) {
        return parse(text)
    }
    else {
        return <p></p>
    }

}

function CommentsList({ comments }) {

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
                                <div>{parseComment(text)}</div>
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

export default class Comments extends React.Component {

    state = {
        comments: [],
        error: null
    }

    componentDidMount() {
        const { postId } = this.props;
        console.log(postId)
        this.fetchComments(postId);
    }

    fetchComments = (postId) => {
        getComments(postId).then(result => this.setState({
            comments: result
        })).catch(() => {
            console.warn('Error fetching post')
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

        console.table(comments)


        return (
            <React.Fragment>
                { this.isLoading() && <Loading text='Fetching comments' />}
                { error && <p className='center-text error'>{error}</p>}
                {comments.length > 0 && <CommentsList comments={comments} />}
            </React.Fragment>
        )
    }
}
