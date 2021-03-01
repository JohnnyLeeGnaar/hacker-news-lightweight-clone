import React from "react";
import { Link } from "react-router-dom";

export default ({ url, title, by, date, hours, id, descendants }) => (
  <li className="post" key={id}>
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
