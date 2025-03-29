class TinyShelf {
  constructor(type = "local") {
    this.store = type === "session" ? sessionStorage : localStorage;
  }

  set(key, value, options = {}) {
    const data = {
      value,
      expires: options.expires ? Date.now() + options.expires * 60000 : null,
    };
    this.store.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const item = this.store.getItem(key);
    if (!item) return null;

    const { value, expires } = JSON.parse(item);
    if (expires && Date.now() > expires) {
      this.remove(key);
      return null;
    }
    return value;
  }

  remove(key) {
    this.store.removeItem(key);
  }

  clear() {
    this.store.clear();
  }
}

export default TinyShelf;