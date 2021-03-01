import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import { getPost } from "../utils/api";

import Loading from "../components/Loading";
import Comments from "../components/Comments";

export default class Post extends React.Component {
  state = {
    post: {},
    error: null,
  };

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = () => {
    const { id } = queryString.parse(this.props.location.search);
    getPost(id)
      .then((result) =>
        this.setState({
          post: result,
        })
      )
      .catch(() => {
        console.warn("Error fetching post");
        this.setState({
          error: "A NetworkError occured while attempting to fetch resource.",
        });
      });
  };

  isLoading = () => {
    const { post, error } = this.state;

    return Object.keys(post).length === 0 && error === null;
  };

  render() {
    const { post, error } = this.state;
    const { title, by, id, descendants, kids=[] } = post;
    const query = queryString.parse(this.props.location.search);
    const postId = query.id;
    let date = new Date(post.time * 1000).toLocaleDateString();
    let hours = new Date(post.time * 1000).toLocaleTimeString();

    if (error) {
      return error && <p className="center-text error">{error}</p>;
    }
    if (!post) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className="meta-info-light">
          <h1>{title}</h1>
          <span>
            {" "}
            by <a href="#">{by}</a>
          </span>
          <span>
            {" "}
            on {date}, {hours}{" "}
          </span>
          <span>
            <Link
              to={{
                pathname: "post",
                search: `id=${id}`,
              }}
            >
              {descendants}
            </Link>{" "}
            comments
          </span>
        </div>
        <div className="meta-info-light">
          {kids.length && <Comments commentsIds={kids} />}
        </div>
      </React.Fragment>
    );
  }
}
