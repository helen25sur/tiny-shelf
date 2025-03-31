# tiny-shelf

`tiny-shelf` is a **lightweight** and **easy-to-use** browser storage manager. It provides a unified API for `localStorage` and `sessionStorage`. It supports automatic **expiration** of stored data and allows event listeners to **track storage changes** within the same window.

## Using
  ```
  import { TinyShelf } from '/node_modules/tiny-shelf/index.js';
  ```
### Constructor: `constructor(type = "local")`
  * Initializes the storage type (localStorage or sessionStorage).
  * Creates a Set to store event listeners.
  * Listens for the "storage" event, which is triggered when storage changes occur in another browser tab.
Example usage:
```
const storage = new TinyShelf("session"); // Uses sessionStorage instead of localStorage
```

### Set Data: `set(key, value, options = {})`
  * Stores a key-value pair in the selected storage. 
  * Supports an optional expiration time (expires in milliseconds).
  * Calls notifyChange() to inform listeners about the update.

Example usage:
```
storage.set("user", { name: "Alice" }, { expires: 60000 }); // Expires in 60 seconds
```

### Get Data: `get(key)`
  * Retrieves the value associated with the given key.
  * If the data has expired, it removes the key and returns null.

Example usage:
```
console.log(storage.get("user")); // Outputs: { name: "Alice" } or null if expired
```

### Remove Data: `remove(key)`
  * Deletes the specified key from storage.
  * Calls `notifyChange()` to inform listeners.

Example usage:
```
storage.remove("user"); // Removes "user" from storage
```

### Clear Storage: `clear()`
  * Clears all data from the storage.
  * Calls `notifyChange()` with `null` to inform listeners.

Example usage:
```
storage.clear(); // Clears all stored data
```

### Subscribe to Changes: `onChange(callback)`
  * Registers a callback function that is triggered when any storage value changes.
  * Stores the callback in a Set to avoid duplicate listeners.

Example usage:
```
storage.onChange((key, value) => {
  console.log(`Key "${key}" changed! New value:`, value);
});
```

### Unsubscribe from Changes: `offChange(callback)`
  * Removes a previously added listener from the Set.

Example usage:
```
const callback = (key, value) => console.log(`${key} updated:`, value);
storage.onChange(callback);
storage.offChange(callback); // Removes the callback from the listeners
```

### Notify Listeners: `notifyChange(key, value)`
  * Calls all registered listeners whenever a value is set, removed, or cleared.
  * Ensures real-time updates in the same window.

This method is automatically triggered by `set()`, `remove()`, and `clear()`.

  
| Feature of `tiny-shelf` |  |	
| ---------------------- |--|
| Unified API for `localStorage` and `sessionStorage` |	✅	|
| expires (auto-removal after a set time) |	✅	|
| Small size (zero dependencies) | 	✅	|
| `onChange` for reacting to storage changes |	✅	|
| Built-in encryption |	🔜	|
| IndexedDB support |	🔜	|