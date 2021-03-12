import React from "react";
import parse from "html-react-parser";
import { Link } from 'react-router-dom'

import Comments from "../screens/Comments";

function parseComment(text) {
  if (text !== undefined && text.length) {
    return parse(text);
  } else {
    return <p></p>;
  }
}

export default ({ by, text, date, hours, kids, deleted }) =>
  !deleted && (
    <li className="comment">
      <div className="meta-info-light">
        <span>
        <Link
              to={{
                pathname: "user",
                search: `id=${by}`,
              }}
            >
              {by}
            </Link>{" "}
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
