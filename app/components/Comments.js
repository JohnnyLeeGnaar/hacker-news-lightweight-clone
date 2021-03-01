import React from "react";
import { getItems } from "../utils/api";

import Loading from "./Loading";
import CommentsList from "./CommentsList";

export default class Comments extends React.Component {
  state = {
    comments: [],
    error: null,
  };

  componentDidMount() {
    const { commentsIds } = this.props;

    if (commentsIds?.length > 0) {
      this.fetchComments(commentsIds);
    }
  }

  fetchComments = (commentsIds) => {
    getItems(commentsIds)
      .then((comments) =>
        this.setState({
          comments,
        })
      )
      .catch(() => {
        console.warn("Error fetching post");
        this.setState({
          error: "A NetworkError occured while attempting to fetch resource.",
        });
      });
  };

  render() {
    const { comments, error } = this.state;
    const { commentsIds } = this.props;

    if (!commentsIds || commentsIds?.length === 0) {
      return null;
    }

    if (!comments.length) {
      return <Loading text="Fetching comments" />;
    }
    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return <CommentsList comments={comments} />;
  }
}
