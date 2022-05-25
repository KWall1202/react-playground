import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBarElement(props) {
  return <li className="NavElement">{props.children}</li>;
}

function Navbar() {
  return (
    <nav className="NavBar">
      <ul className="NavList">
        <NavBarElement>
          <Link to="/react-playground">Home</Link>
        </NavBarElement>
        <NavBarElement>
          <Link to="/weather">Weather</Link>
        </NavBarElement>
      </ul>
    </nav>
  );
}

export default Navbar;