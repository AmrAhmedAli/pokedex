import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";

class NavBar extends Component {
  render() {
    return (
      <Navbar variant="dark" className="navigation">
        <Navbar.Brand href="#home" className="navigationbrand">
          <img
            alt=""
            src="/pokedexIcon.png"
            width="120"
            height="50"
            className="d-inline-block align-top aMargin"
          />
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
