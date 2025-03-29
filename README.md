# tiny-storage

`tiny-store` is a **lightweight** and **easy-to-use** browser storage manager. It provides a unified API for `localStorage` and `sessionStorage`, supports automatic **expiration** (expires) after 60000ms

## Using
  ```
  import { TinyStorage } from "./index.js";
  const storage = new TinyStorage("local");
  storage.set("user", { name: "Alice" }, { expires: 30000 });
  console.log(storage.get("user"));
  ```
  
| Функції	`tiny-storage` |  |	
| ---------------------- |--|
| Єдиний API для localStorage та sessionStorage |	✅	|
| expires (видалення через певний час) |	✅	|
| Маленький розмір (без залежностей) | 	✅	|
| onChange для реакції на зміни |	🔜	|
| Вбудоване шифрування |	🔜	|
| Підтримка indexedDB |	🔜	|