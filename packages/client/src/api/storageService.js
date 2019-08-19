const store = window.localStorage;

export default {
  setItem(key, value) {
    const json = JSON.stringify(value);
    store.setItem(key, json);
    return json;
  },

  getItem(key) {
    return JSON.parse(store.getItem(key));
  },

  removeItem(key) {
    return store.removeItem(key);
  },

  clear() {
    return store.clear();
  },
};
