export const setClientStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getClientStorage = (key: string) => {
  const storageValue = localStorage.getItem(key);

  if (!storageValue) {
    return null;
  }

  if (typeof storageValue === "string") return storageValue;

  return JSON.parse(storageValue);
};

export const destroyClientStorage = (key: string) => {
  localStorage.removeItem(key);
};