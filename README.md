# tiny-shelf

`tiny-shelf` is a **lightweight** and **easy-to-use** browser storage manager. It provides a unified API for `localStorage` and `sessionStorage`, supports automatic **expiration** (expires)

## Using
  ```
  import { TinyShelf } from '/node_modules/tiny-shelf/index.js';
  const storage = new TinyShelf("local");
  storage.set("user", { name: "Alice" }, { expires: 30000 });
  console.log(storage.get("user"));
  ```
  
| Feature of `tiny-shelf` |  |	
| ---------------------- |--|
| Unified API for `localStorage` and `sessionStorage` |	✅	|
| expires (auto-removal after a set time) |	✅	|
| Small size (zero dependencies) | 	✅	|
| `onChange` for reacting to storage changes |	🔜	|
| Built-in encryption |	🔜	|
| IndexedDB support |	🔜	|