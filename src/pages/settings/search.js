import clsx from "clsx";
import React from "react";
import Obfuscate from "../../components/obfuscate.js";
import { useLocalEngine, useLocalProxy } from "../../settings.js";
import { useTranslation } from 'react-i18next';

function EngineOption({ type, children }) {
  var [localEngine, setLocalEngine] = useLocalEngine();

  return (
    <div
      onClick={() => {
        setLocalEngine(type);
      }}
      className={clsx("optionchoose", type === localEngine && "chooseactive")}
    >
      {children}
    </div>
  );
}

function ProxyOption({ type, children }) {
  var [localProxy, setLocalProxy] = useLocalProxy();

  return (
    <div
      onClick={() => {
        setLocalProxy(type);
      }}
      className={clsx("optionchoose", type === localProxy && "chooseactive")}
    >
      {children}
    </div>
  );
}

function Search() {
  const { t } = useTranslation("settings");

  return (
    <>
      <div className="optiontitle">
        <Obfuscate>{t("search.proxy")}</Obfuscate>
      </div>
      <div className="chooseoption">
        <ProxyOption type="Ultraviolet">
          <Obfuscate>Ultraviolet</Obfuscate>
        </ProxyOption>
        <ProxyOption type="Stomp">
          <Obfuscate>Stomp</Obfuscate>
        </ProxyOption>
        <ProxyOption type="DIP">
          <Obfuscate>DIP</Obfuscate>
        </ProxyOption>
        <ProxyOption type="Osana">
          <Obfuscate>Osana</Obfuscate>
        </ProxyOption>
        <ProxyOption type="Aero">
          <Obfuscate>Aero</Obfuscate>
        </ProxyOption>
      </div>
      <div className="optiontitle">
        <Obfuscate>{t("search.engine")}</Obfuscate>
      </div>
      <div className="chooseoption">
        <EngineOption type="Google">
          <Obfuscate>Google</Obfuscate>
        </EngineOption>
        <EngineOption type="DuckDuckGo">
          <Obfuscate>DuckDuckGo</Obfuscate>
        </EngineOption>
        <EngineOption type="Bing">
          <Obfuscate>Bing</Obfuscate>
        </EngineOption>
        <EngineOption type="Brave">
          <Obfuscate>Brave</Obfuscate>
        </EngineOption>
      </div>
    </>
  );
}

export default Search;
