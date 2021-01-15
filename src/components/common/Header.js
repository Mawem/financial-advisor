import React from "react";
import { NavLink } from "react-router-dom";
import "foundation-icons/foundation-icons.css";

const Header = () => {
  const mainText = { color: "#1779ba" };
  return (
    <div className="top-bar header-bar">
      <div className="top-bar-left">
        <ul className="row align-center" data-dropdown-menu>
          <nav className="column small-4">
            <NavLink to="/" activeStyle={mainText} exact>
              <i className="step fi-home size-48" style={mainText}>
                {" "}
                  Home
                {" "}
              </i>
            </NavLink>
          </nav>
          <h2 className="column small-8 menu-text" style={mainText}>
            Financial Advisor
          </h2>
        </ul>
      </div>
    </div>
  );
};

export default Header;
