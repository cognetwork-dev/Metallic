import useLocalStorage from "./useLocalStorage.jsx";

const useLocalFallback = (key, fallback) => {
  var [local, setLocal] = useLocalStorage(key);
  return [local === null ? fallback : local, setLocal];
};

export var useLocalLanguage = () => useLocalFallback("language", "en");
export var useLocalEngine = () => useLocalFallback("engine", "Google");
export var useLocalBackground = () => useLocalFallback("background", "none");
export var useLocalAppearance = () => useLocalFallback("appearance", "default");
export var useLocalControls = () => useLocalFallback("controls", "default");
export var useLocalWindow = () => useLocalFallback("window", "default");
export var useLocalRounding = () => useLocalFallback("rounding", "default");
export var useLocalProxy = () => useLocalFallback("type", "Ultraviolet");
export var useLocalTitle = () => useLocalStorage("title");
export var useLocalIcon = () => useLocalStorage("icon");
