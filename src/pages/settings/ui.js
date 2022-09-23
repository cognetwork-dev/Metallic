import clsx from "clsx";
import React from "react";
import Obfuscate from "../../components/obfuscate.js";
import { useLocalControls, useLocalWindow } from "../../settings.js";

function WindowOption({ type, children }) {
  const [localWindow, setLocalWindow] = useLocalWindow();

  return (
    <div
      onClick={() => {
        setLocalWindow(type);
      }}
      className={clsx("optionchoose", type === localWindow && "chooseactive")}
    >
      {children}
    </div>
  );
}

function ControlsOption({ type, children }) {
  const [localControls, setLocalControls] = useLocalControls();

  return (
    <div
      onClick={() => {
        setLocalControls(type);
      }}
      className={clsx("optionchoose", type === localControls && "chooseactive")}
    >
      {children}
    </div>
  );
}

function UI() {
  return (
    <>
      <div className="optiontitle">
        <Obfuscate>Window</Obfuscate>
      </div>
      <div className="chooseoption">
        <WindowOption type="default">
          <Obfuscate>Default</Obfuscate>
        </WindowOption>
        <WindowOption type="simple">
          <Obfuscate>Simple</Obfuscate>
        </WindowOption>
        <WindowOption type="ab">
          <Obfuscate>About:Blank</Obfuscate>
        </WindowOption>
      </div>
      <div className="optiontitle">
        <Obfuscate>Controls</Obfuscate>
      </div>
      <div className="chooseoption">
        <ControlsOption type="default">
          <Obfuscate>Default</Obfuscate>
        </ControlsOption>
        <ControlsOption type="classic">
          <Obfuscate>Classic</Obfuscate>
        </ControlsOption>
      </div>
    </>
  );
}

export default UI;
