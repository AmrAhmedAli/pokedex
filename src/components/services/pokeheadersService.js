import axios from "axios";
let pokemons = [];

export default async function getPokeheaders() {
  if (pokemons.length <= 0) {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    pokemons = response.data.results;
    return pokemons;
  } else {
    console.log("her22");
    return pokemons;
  }
}
