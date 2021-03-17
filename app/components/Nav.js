import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "black",
  fontWeight: "900",
};

export default function Nav() {
  return (
    <nav >
      <ul className='navbar'>
        <li>
          <NavLink to="/" exact activeStyle={activeStyle} className="nav-link">
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeStyle={activeStyle} className="nav-link">
            New
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
