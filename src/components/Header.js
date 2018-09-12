import React from "react";

const Header = props => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div className="navbar-brand">{props.brand}</div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  </nav>
);

export default Header;
