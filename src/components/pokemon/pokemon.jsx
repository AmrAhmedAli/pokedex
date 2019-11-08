import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import "./pokemon.css";
import cache from "../services/lrucacheService";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBIcon } from "mdbreact";

class Pokemon extends Component {
  state = {
    name: this.props.name
  };
  handleHover = pokemon => {
    const cachedPage = cache.get(pokemon);
    if (cachedPage) {
      this.setState({
        load: false,
        fetched: true
      });
    } else {
      this.setState({
        load: true,
        fetched: false
      });
      axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon).then(res => {
        cache.set(pokemon, res.data);
        this.setState({
          load: false,
          fetched: true
        });
      });
    }
  };
  render() {
    return (
      <li
        className={this.props.active}
        onMouseOver={() => this.handleHover(this.state.name)}
        onClick={() => this.props.Clicked(this.state.name)}
      >
        <a>
          {this.state.name}
          {this.state.load && (
            <Spinner
              className="menuspinner"
              animation="border"
              variant="success"
            />
          )}
          {this.state.fetched && (
            <MDBIcon className="menuspinner" icon="check" />
          )}
        </a>
      </li>
    );
  }
}

export default Pokemon;
