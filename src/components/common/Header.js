import React from "react";
import { NavLink } from "react-router-dom";
import "foundation-icons/foundation-icons.css";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="row align-center" data-dropdown-menu>
          <nav className="column small-4">
            <NavLink to="/" activeStyle={activeStyle} exact>
              <i className="step fi-home size-48"> Home</i>
            </NavLink>
          </nav>
          <h2 className="column small-8 menu-text">Financial Advisor</h2>
        </ul>
      </div>
    </div>
  );
};

export default Header;
