import React, { Component } from "react";
import Pokemon from "./pokemon";
import axios from "axios";
import lru from "lru-cache";

const cache = new lru({
  maxAge: 300000,
  max: 500000000000,
  length: n => {
    // n = item passed in to be saved (value)
    return n.length * 100;
  }
});
class PokeList extends Component {
  state = {
    pokemons: this.props.pokemons
  };

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
      console.log("ViewNow");
      console.log(cachedPage);
    } else {
      console.log("loading");
      setTimeout(async function() {
        await this.handleClick(pokemon);
      }, 100000);
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
    );
  }
}

export default PokeList;
