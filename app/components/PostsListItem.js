import React from "react";
import { Link } from "react-router-dom";

export default ({ url, title, by, date, hours, id, descendants }) => (
  <>
    <a className="link-info" href={url}>
      {title}
    </a>
    <div className="post-list">
      <span> by </span>
      <span>
        <Link
          className="link-info-minor"
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

      <span>
        <Link
          className="link-info-minor"
          to={{
            pathname: "/post",
            search: `id=${id}`,
          }}
        >
          {descendants}
        </Link>{" "}
        comments
      </span>
    </div>
  </>
);
