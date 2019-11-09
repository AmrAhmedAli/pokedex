import React, { Component } from "react";
import getPokeCardDetails from "../services/pokeCardService";
import "./main.css";

class Main extends Component {
  state = {};

  async componentDidMount() {
    const page = await getPokeCardDetails(this.props.pokemon);
    this.setState({
      card: page,
      clickedPoke: this.props.pokemon,
      types: null,
      stats: null,
      front: "true"
    });
  }

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

  render() {
    return (
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
                      <span className="badge badge-pill align-self-start mb-3 blackbtn">
                        <span>{this.state.clickedPoke}</span>
                      </span>
                      <button
                        type="button"
                        className="btn btn-lg btn-block redbtn"
                        onClick={this.statsClicked}
                        style={{ "margin-bottom": "1rem" }}
                      >
                        Stats
                      </button>
                      <button
                        type="button"
                        className="btn btn-lg btn-block redbtn"
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
    );
  }
}

export default Main;
