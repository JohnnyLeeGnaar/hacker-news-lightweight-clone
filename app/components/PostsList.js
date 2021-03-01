import React from "react";

import PostsListItem from "./PostsListItem";

export default ({ posts }) => (
  <ul>
    {posts.map((post, index) => {
      if (post) {
        const { by, descendants, id, time, title, url } = post;
        let date = new Date(time * 1000).toLocaleDateString();
        let hours = new Date(time * 1000).toLocaleTimeString();

        return (
          <PostsListItem
            url={url}
            title={title}
            by={by}
            date={date}
            hours={hours}
            id={id}
            descendants={descendants}
          />
        );
      } else {
        return console.log(`a value was null on index ${index}`);
      }
    })}
  </ul>
);
