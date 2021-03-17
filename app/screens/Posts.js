import React from "react";

import { getPosts } from "../utils/api";

import Loading from "../components/Loading";
import PostsList from "../components/PostsList";

export default class Posts extends React.Component {
  state = {
    posts: [],
    error: null,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  componentWillUnmount() {
    console.log(`posts will unmount`);
  }

  fetchPosts = () => {
    const { type } = this.props;

    getPosts(type)
      .then((posts) => this.setState({ posts }))
      .catch(() => {
        console.warn("Error fetching posts");
        this.setState({
          error: "A NetworkError occured while attempting to fetch resource.",
        });
      });
  };

  render() {
    const { posts, error } = this.state;

    if (error) {
      return error && <p className="center-text error">{error}</p>;
    }
    if (!posts.length) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className="posts-light">
          <PostsList posts={posts} />
        </div>
      </React.Fragment>
    );
  }
}
