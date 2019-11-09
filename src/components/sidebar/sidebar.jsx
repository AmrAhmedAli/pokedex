import React, { Component } from "react";
import Main from "../main/main";
import Pokemon from "../pokemon/pokemon";
import getPokeheaders from "../services/pokeheadersService";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const pokemons = await getPokeheaders();
    this.setState({ pokemons });
  }
  async handleClick(pressedPoke) {
    await this.setState({
      pressedPoke: null
    });
    this.setState({
      pressedPoke
    });
  }
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
                  Clicked={this.handleClick}
                  name={pokemon.name}
                />
              ))}
            </ul>
          )}
        </nav>
        {this.state.pressedPoke && <Main pokemon={this.state.pressedPoke} />}
      </div>
    );
  }
}

export default Sidebar;
