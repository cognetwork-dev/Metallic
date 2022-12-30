import clsx from "clsx";
import React from "react";
import Obfuscate from "../../components/obfuscate.js";
import { useLocalControls, useLocalWindow, useLocalRounding } from "../../settings.js";

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

function RoundingOption({ type, children }) {
  const [localRounding, setLocalRounding] = useLocalRounding();

  return (
    <div
      onClick={() => {
        setLocalRounding(type);
      }}
      className={clsx("optionchoose", type === localRounding && "chooseactive")}
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
        <ControlsOption type="modern">
          <Obfuscate>Modern</Obfuscate>
        </ControlsOption>
        <ControlsOption type="classic">
          <Obfuscate>Classic</Obfuscate>
        </ControlsOption>
      </div>
      <div className="optiontitle">
        <Obfuscate>Rounding</Obfuscate>
      </div>
      <div className="chooseoption">
        <RoundingOption type="default">
          <Obfuscate>Default</Obfuscate>
        </RoundingOption>
        <RoundingOption type="square">
          <Obfuscate>Square</Obfuscate>
        </RoundingOption>
        <RoundingOption type="fancy">
          <Obfuscate>Fancy</Obfuscate>
        </RoundingOption>
        <RoundingOption type="circle">
          <Obfuscate>Circle</Obfuscate>
        </RoundingOption>
      </div>
    </>
  );
}

export default UI;
