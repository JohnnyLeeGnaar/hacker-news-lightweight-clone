import React from "react";
import { getUser, getItems } from "../utils/api";
import queryString from "query-string";
import parse from "html-react-parser";

import Loading from "./Loading";
import PostsList from "./PostsList";

function parseUser(text) {
  if (text !== undefined && text.length) {
    return parse(text);
  } else {
    return <p></p>;
  }
}

export default class User extends React.Component {
  state = {
    user: {},
    posts: [],
    error: null,
    loadingUser: true,
    loadingPosts: true,
  };
  /*
   this.setState({
      items: [],
      pages: null
    }, () => api(page, pageSize, orderByValue, orderByDirection, search)
      .then(result => this.setState({ items: result.data, pages: result.metadata.pages }),
      updateUrlQueryParams({ orderByValue, orderByDirection, search, pageSize, page })
      ));
  }
  */

  fetchUser(id) {
    this.setState({
      user: {},
      posts: [],
      loadingUser: true,
      loadingPosts: true,
    });
    return getUser(id)
      .then((user) => {
        this.setState({
          user,
          loadingUser: false,
        });
        return user;
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loadingUser: false,
        });
      });
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const userId = query.id;

    this.fetchUser(userId).then((user) =>
      getItems(user.submitted.slice(0, 100)).then((posts) =>
        this.setState({ posts, loadingPosts: false })
      )
    );
  }

  render() {
    const { user, posts, error, loadingUser, loadingPosts } = this.state;
    const { id, karma, about } = user;
    console.log();
    let date = new Date(user.created * 1000).toLocaleDateString();
    let hours = new Date(user.created * 1000).toLocaleTimeString();

    if (error) {
      return error && <p className="center-text error">{error}</p>;
    }

    return (
      <React.Fragment>
        {loadingUser === true ? (
          <Loading text="Fetching user" />
        ) : (
          <div className="post-light">
            <h1>{id}</h1>
            <span>
              {" "}
              joined {date}, {hours}{" "}
            </span>
            <span>has {karma} karma</span>
            <br />
            <span>{parseUser(about)}</span>{" "}
          </div>
        )}

        <div className="post-light">

          <h2>Posts: </h2>
          {loadingPosts === true ? (
            <Loading text="Fetching posts" />
          ) : (
            <PostsList posts={posts} />
          )}
        </div>
      </React.Fragment>
    );
  }
}
