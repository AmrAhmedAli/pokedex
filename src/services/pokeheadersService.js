import axios from "axios";
let pokemons = [];

export function getPokeheaders() {
  if (pokemons.length <= 0) {
    axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
      pokemons = res.data.results;
      console.log(pokemons);
      return res.data.results;
    });
  } else {
    console.log("her22");
    return pokemons;
  }
}
