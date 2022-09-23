import { useEffect, useState } from "react";

const target = new EventTarget();

/**
 *
 * @param {string} key
 * @returns {[string|null, (value: string|null) => void]}
 */
export default function useLocalStorage(key) {
  // trigger re-render with useState
  const [state, setState] = useState(localStorage.getItem(key));

  const event = `set ${key}`;

  useEffect(() => {
    function listener() {
      setState(localStorage.getItem(key));
    }

    target.addEventListener(event, listener);

    return () => target.removeEventListener(event, listener);
  });

  return [
    state,
    (value) => {
      // null = nuke the item
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);

      setState(value);
      target.dispatchEvent(new Event(event));
    },
  ];
}
