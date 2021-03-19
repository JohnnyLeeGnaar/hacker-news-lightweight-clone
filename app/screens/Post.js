import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import { getPost } from "../utils/api";

import Loading from "../components/Loading";
import Comments from "./Comments";

export default class Post extends React.Component {
  state = {
    post: {},
    error: null,
    loading: true,
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
          error: null,
          loading: false,
        })
      )
      .catch((error) => {
        console.warn("Error fetching repos: ", error);

        this.setState({
          error: `There was an error fetching the user.`,
        });
      });
  };

  render() {
    const { post, error, loading } = this.state;
    const { title, url, by, id, descendants, kids = [] } = post;
    let date = new Date(post.time * 1000).toLocaleDateString();
    let hours = new Date(post.time * 1000).toLocaleTimeString();

    if (error) {
      return error && <p className="center-text error">{error}</p>;
    }
    if (loading) {
      return <Loading />;
    }

    return (
      <>
        <div className="post-light">
          <h1>
            <a href={url}>{title}</a>
          </h1>
          <span>by </span>
          <span>
            <Link
              className="link-info-minor"
              to={{
                pathname: "user",
                search: `id=${by}`,
              }}
            >
              {by}
            </Link>{" "}
            comments
          </span>
          <span>
            {" "}
            on {date}, {hours}{" "}
          </span>
          <span>
            <Link
              className="link-info-minor"
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
        <div className="posts-light">
          {kids.length && <Comments commentsIds={kids} />}
        </div>
      </>
    );
  }
}
