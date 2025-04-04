(async () => {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector
  const data = new TextEncoder().encode("Hello, world!");

  // Шифрування
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  // Розшифрування
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );

  console.log(key);
  console.log(new TextDecoder().decode(encrypted));

  console.log(new TextDecoder().decode(decrypted));
})()
