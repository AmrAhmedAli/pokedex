import axios from "axios";
import cache from "../services/lrucacheService";

export default async function getPokeCardDetails(pokemon) {
  let cachedPage = cache.get(pokemon);
  if (cachedPage) {
    return cachedPage;
  } else {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon).then(res => {
      cache.set(pokemon, res.data);
      return res.data;
    });
  }
}
