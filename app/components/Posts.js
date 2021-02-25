import React from "react";
import ReactDOM from "react-dom";
import { getPosts } from "../utils/api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const PostsList = ({ posts }) => (
  <ul>
    {posts.map((post, index) => {
      if (post) {
        const { by, descendants, id, time, title, url } = post;
        let date = new Date(time * 1000).toLocaleDateString();
        let hours = new Date(time * 1000).toLocaleTimeString();

        return (
          <li className="post" key={index}>
            <a className="link" href={url}>
              {title}
            </a>
            <div className="meta-info-light">
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
          </li>
        );
      } else {
        return console.log(`a value was null on index ${index}`);
      }
    })}
  </ul>
);

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
        <div>
          <h1>Posts:</h1>
          <PostsList posts={posts} />
        </div>
      </React.Fragment>
    );
  }
}
