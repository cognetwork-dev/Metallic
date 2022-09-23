import useLocalStorage from "./useLocalStorage.js";

const useLocalFallback = (key, fallback) => {
  var [local, setLocal] = useLocalStorage(key);
  return [local === null ? fallback : local, setLocal];
};

export var useLocalEngine = () => useLocalFallback("engine", "default");
export var useLocalBackground = () => useLocalFallback("engine", "default");
export var useLocalAppearance = () => useLocalFallback("appearance", "default");
export var useLocalControls = () => useLocalFallback("controls", "default");
export var useLocalWindow = () => useLocalFallback("window", "default");
export var useLocalProxy = () => useLocalFallback("type", "Ultraviolet");
export var useLocalTitle = () => useLocalStorage("title");
export var useLocalIcon = () => useLocalStorage("icon");
