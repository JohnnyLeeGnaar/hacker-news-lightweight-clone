import React, { useState } from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import Comments from "../screens/Comments";

function parseComment(text) {
  if (text !== undefined && text.length) {
    return parse(text);
  } else {
    return <p></p>;
  }
}

export default function CommentsListItem({
  by,
  text,
  date,
  hours,
  kids,
  deleted,
}) {
  const [isActive, setActive] = useState(true);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
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
        <button onClick={toggleClass} className='btn-comments'>
          {kids ? "Show children comments" : ""}
        </button>
        <div className={isActive ? "test" : null}>
          <Comments commentsIds={kids} />
        </div>    
      </li>
    )
  );
}
