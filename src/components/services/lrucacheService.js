import lru from "lru-cache";

// maxAge is in ms
const cache = new lru({
  maxAge: 300000,
  max: 500000000000,
  length: n => {
    // n = item passed in to be saved (value)
    return n.length * 100;
  }
});

export const set = (key, value) => {
  cache.set(key, value);
};

export const get = key => {
  return cache.get(key);
};
export const clear = key => {
  return cache.clear;
};

export default {
  get,
  set,
  clear
};
