import React from "react";
import parse from "html-react-parser";

import Comments from "./Comments";

function parseComment(text) {
  if (text !== undefined && text.length) {
    return parse(text);
  } else {
    return <p></p>;
  }
}

export default ({ by, text, date, hours, kids, deleted }) => (

  !deleted &&
  <li className="comment">
    <div className="meta-info-light">
      <span>
        {" "}
        by <a href="#">{by}</a>
      </span>
      <span>
        {" "}
        on {date}, {hours}{" "}
      </span>
      <div>{parseComment(text)}</div>
    </div>
    <Comments commentsIds={kids} />
  </li>
);
