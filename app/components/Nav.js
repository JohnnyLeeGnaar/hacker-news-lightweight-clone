import React from "react";
import { NavLink } from "react-router-dom";

import { ThemeConsumer } from "../contexts/theme";

const activeStyle = {
  color: "black",
  fontWeight: "900",
};

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav>
          <div className="navbar">
            <div className='navbar-item'>
              <NavLink
                to="/"
                exact
                activeStyle={activeStyle}
                className="nav-link"
              >
                Top
              </NavLink>
            </div>
            <div className='navbar-item'>
              <NavLink to="/new" activeStyle={activeStyle} className="nav-link">
                New
              </NavLink>
            </div>
          </div>
          <button
            style={{ fontSize: 30}}
            className='btn-theme'
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
