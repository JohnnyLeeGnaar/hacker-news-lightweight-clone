import React from "react";
import { getUser, getItems } from "../utils/api";
import queryString from "query-string";

import Loading from "./Loading";
import PostsList from "./PostsList";

export default class User extends React.Component {
  state = {
    user: {},
    posts: [],
    error: null,
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const userId = query.id;

    const { user } = this.state;

    getUser(userId)
      .then((user) => {
        this.setState({
          user,
        });
        return user;
      })
      .then((user) => getItems(user.submitted))
      .then((posts) => this.setState({ posts }))
      .catch(() => {
        console.warn("Error fetching user");
      });
  }

  render() {
    const { user, posts, error } = this.state;
    const { id, karma, about } = user;
    let date = new Date(user.created * 1000).toLocaleDateString();
    let hours = new Date(user.created * 1000).toLocaleTimeString();

    if (error) {
      return error && <p className="center-text error">{error}</p>;
    }
    if (!user) {
      return <Loading text="Fetching user" />;
    }
    if (!posts.length) {
      return <Loading text="Fetching posts" />;
    }

    return (
      <React.Fragment>
        <div className="userDetails">
          <h1>{id}</h1>
          <span>
            {" "}
            joined {date}, {hours}{" "}
          </span>
          <span>has {karma} karma</span>
          <br />
          <span>{about}</span>
        </div>

        <div className="userPosts">
         <PostsList posts={posts} />
        </div>
      </React.Fragment>
    );
  }
}
