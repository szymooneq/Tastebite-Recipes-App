import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storageValue = window.localStorage.getItem(key);
    return storageValue ? JSON.parse(storageValue) : defaultValue;
  });

  const setValue = (val) => {
    setState(val);
    window.localStorage.setItem(key, JSON.stringify(val));
  };

  return [state, setValue];
}
