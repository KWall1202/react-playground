import React from "react";
import "./NavBar.css";

function NavBarElement(props) {
  return <li className="NavElement">{props.children}</li>;
}

function Navbar(props) {
  const elements = props.children.slice().map((c, i) => {
    return <NavBarElement key={"Element" + i.toString()}>{c}</NavBarElement>
  });

  return (
    <nav className="NavBar">
      <ul className="NavList">
        {elements}
      </ul>
    </nav>
  );
}

export default Navbar;