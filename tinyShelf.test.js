/**
 * @jest-environment jsdom
 */


import { jest } from '@jest/globals';
import { TinyShelf } from "./index.js";


describe('TinyShelf', () => {
  let storage;

  beforeEach(() => {
    storage = new TinyShelf("local");
    localStorage.clear(); // Очищуємо перед кожним тестом
  });

  test('set and get should store and retrieve values', () => {
    storage.set("testKey", "testValue");
    expect(storage.get("testKey")).toBe("testValue");
  });

  test('get should return null for expired values', () => {
    storage.set("tempKey", "tempValue", { expires: -1000 }); // Минуле значення
    expect(storage.get("tempKey")).toBeNull();
  });

  test('remove should delete a key', () => {
    storage.set("removeKey", "toBeDeleted");
    storage.remove("removeKey");
    expect(storage.get("removeKey")).toBeNull();
  });

  test('clear should remove all keys', () => {
    storage.set("key1", "value1");
    storage.set("key2", "value2");
    storage.clear();
    expect(storage.get("key1")).toBeNull();
    expect(storage.get("key2")).toBeNull();
  });

  test('onChange should trigger on value change', () => {
    const callback = jest.fn();
    storage.onChange(callback);
    
    storage.set("watchKey", "watchValue");
    
    expect(callback).toHaveBeenCalledWith("watchKey", "watchValue");
  });

  test('onChange should trigger on remove', () => {
    const callback = jest.fn();
    storage.set("watchKey", "watchValue");
    storage.onChange(callback);

    storage.remove("watchKey");

    expect(callback).toHaveBeenCalledWith("watchKey", null);
  });

  test('offChange should stop triggering', () => {
    const callback = jest.fn();
    storage.onChange(callback);
    
    storage.set("watchKey", "watchValue");
    storage.offChange(callback);
    storage.set("watchKey", "newValue");

    expect(callback).toHaveBeenCalledTimes(1); // Тільки один виклик
  });
});
