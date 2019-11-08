import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./footer.css";

class Foot extends Component {
  state = {};
  render() {
    return (
      <Navbar variant="dark" className="navigation footer" fixed="bottom">
        <Navbar.Brand
          href="https://www.linkedin.com/in/amr-ahmed-ali/"
          className="navigationbrand footer"
        >
          {"Developed By Amr Ahmed"}
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Foot;
