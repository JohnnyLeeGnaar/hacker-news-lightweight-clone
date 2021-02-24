
import React from 'react'
import queryString from 'query-string'
import { getComments } from '../utils/api'


export default class Post extends React.Component {

    state = {
        comments: null, 
        error: null
    }

    componentDidMount() {
       this.fetchComments()
    }

    fetchComments = () => {
        const { id } = queryString.parse(this.props.location.search)
        getComments(id).then(result => this.setState({
            comments: result
        }))

    }

    render() {
        const {comments } = this.state;
        console.table(comments);
        return (
           <React.Fragment>
               <p>Hello</p>
           </React.Fragment>
        )
    }
  
}