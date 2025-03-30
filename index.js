export class TinyShelf {
  constructor(type = "local") {
    this.store = type === "session" ? sessionStorage : localStorage;
    this.listeners = new Set();

    window.addEventListener("storage", (event) => {
      if (event.storageArea === this.store) {
        this.notifyChange(event.key, event.newValue);
      }
    });
  }

  set(key, value, options = {}) {
    const data = {
      value,
      expires: options.expires ? (Date.now() + options.expires) : null,
    };
    this.store.setItem(key, JSON.stringify(data));
    this.notifyChange(key, value);
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
    this.notifyChange(key, null);
  }

  clear() {
    this.store.clear();
    this.notifyChange(null, null);
  }

  onChange(callback) {
    this.listeners.add(callback);
  }

  offChange(callback) {
    this.listeners.delete(callback);
  }

  notifyChange(key, value) {
    this.listeners.forEach((callback) => callback(key, value));
  }
}