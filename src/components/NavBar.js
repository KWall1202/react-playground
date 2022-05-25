import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/react-playground">Home</Link>
        </li>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;