import React, { Component } from "react";
import axios from "axios";
import Pokemon from "../pokemon/pokemon";
import lru from "lru-cache";
import "./main.css";

const cache = new lru({
  maxAge: 300000,
  max: 500000000000,
  length: n => {
    // n = item passed in to be saved (value)
    return n.length * 100;
  }
});

class Main extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props);
    axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
      this.setState({ pokemons: res.data.results });
    });
  }
  handleHover = pokemon => {
    const cachedPage = cache.get(pokemon);
    if (cachedPage) {
      console.log("cached");
      console.log(cachedPage);
    } else {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon).then(res => {
        cache.set(pokemon, res.data);
      });
    }
  };

  handleClick = pokemon => {
    let cachedPage = cache.get(pokemon);
    if (cachedPage) {
      console.log("cached");
      this.setState({
        card: cachedPage,
        clickedPoke: pokemon,
        types: null,
        stats: null,
        front: "true"
      });
    } else {
      console.log("loading....");
    }
  };
  statsClicked = () => {
    this.setState({ stats: "true", types: null });
  };
  typesClicked = () => {
    this.setState({ types: "true", stats: null });
  };
  rotate = () => {
    if (this.state.front) {
      this.setState({ front: null });
    } else {
      this.setState({ front: "true" });
    }
  };
  set = (key, value) => {
    cache.set(key, value);
  };
  get = key => {
    return cache.get(key);
  };
  render() {
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Pokemons</h3>
          </div>
          {this.state.pokemons && (
            <ul className="list-unstyled components">
              {this.state.pokemons.map(pokemon => (
                <Pokemon
                  key={pokemon.name}
                  Hovered={this.handleHover}
                  Clicked={this.handleClick}
                  name={pokemon.name}
                />
              ))}
            </ul>
          )}
        </nav>
        <div id="content">
          <nav>
            <div className="container-fluid">
              <div className="row">
                {this.state.card && (
                  <div className="mb-4 col-md-6 col-lg-4">
                    <div className="dashboard-sq-banner justify-content-end card">
                      <img
                        className="card-img"
                        alt=""
                        src={
                          (this.state.front &&
                            this.state.card.sprites.front_default) ||
                          this.state.card.sprites.back_default
                        }
                      ></img>
                      <p onClick={this.rotate} className="rotateIco">
                        &#x21B7;
                      </p>
                      <div className="justify-content-end d-flex flex-column card-body">
                        <span className="badge badge-pill badge-theme-3 align-self-start mb-3">
                          <span>{this.state.clickedPoke}</span>
                        </span>
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg btn-block"
                          onClick={this.statsClicked}
                        >
                          Stats
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg btn-block"
                          onClick={this.typesClicked}
                        >
                          Types
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.types && (
                  <div className="mb-4 col-md-6 col-lg-4">
                    <div className="dashboard-sq-banner justify-content-end card">
                      <div className="justify-content-end d-flex flex-column card-body">
                        <table className="table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Slot</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.card.types.map(type => (
                              <tr>
                                <td>{type.type.name}</td>
                                <td>{type.slot}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.stats && (
                  <div className="mb-4 col-md-6 col-lg-4">
                    <div className="dashboard-sq-banner justify-content-end card">
                      <div className="justify-content-end d-flex flex-column card-body">
                        <table className="table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Base</th>
                              <th>Effort</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.card.stats.map(stat => (
                              <tr>
                                <td>{stat.stat.name}</td>
                                <td>{stat.base_stat}</td>
                                <td>{stat.effort}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Main;
