import React from "react";

import PostsListItem from "./PostsListItem";

export default ({ posts }) => {

  if(!posts.length){
    return (<h3>This user hasn't posted anything yet</h3>)
  }

  return (

    <div className='posts-info'>
    {posts.map((post) => {
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
            key={id}
            descendants={descendants}
          />
        );
      }
    })}
  </div>
  )

}



  

