import clsx from "clsx";
import React from "react";
import Obfuscate from "../../components/obfuscate.js";
import { useLocalAppearance, useLocalBackground } from "../../settings.js";

function ThemeOption({ type, children }) {
  const [localAppearance, setLocalAppearance] = useLocalAppearance();

  return (
    <div
      onClick={() => {
        setLocalAppearance(type);
      }}
      className={clsx(
        "optionchoose",
        type === localAppearance && "chooseactive"
      )}
    >
      {children}
    </div>
  );
}

function BackgroundOption({ type, children }) {
  const [localBackground, setLocalBackground] = useLocalBackground();

  return (
    <div
      onClick={() => {
        setLocalBackground(type);
      }}
      className={clsx(
        "optionchoose",
        type === localBackground && "chooseactive"
      )}
    >
      {children}
    </div>
  );
}

function Appearance() {
  return (
    <>
      <div className="optiontitle">
        <Obfuscate>Theme</Obfuscate>
      </div>
      <div className="chooseoption">
        <ThemeOption type="default">
          <Obfuscate>Default</Obfuscate>
        </ThemeOption>
        <ThemeOption type="dark">
          <Obfuscate>Dark</Obfuscate>
        </ThemeOption>
        <ThemeOption type="light">
          <Obfuscate>Light</Obfuscate>
        </ThemeOption>
        <ThemeOption type="lime">
          <Obfuscate>Lime</Obfuscate>
        </ThemeOption>
        <ThemeOption type="space">
          <Obfuscate>Space</Obfuscate>
        </ThemeOption>
        <ThemeOption type="molten">
          <Obfuscate>Molten</Obfuscate>
        </ThemeOption>
        <ThemeOption type="retro">
          <Obfuscate>Retro</Obfuscate>
        </ThemeOption>
        <ThemeOption type="eaglenet">
          <Obfuscate>EagleNet</Obfuscate>
        </ThemeOption>
        <ThemeOption type="midnight">
          <Obfuscate>Midnight</Obfuscate>
        </ThemeOption>
        <ThemeOption type="honey">
          <Obfuscate>Honey</Obfuscate>
        </ThemeOption>
        <ThemeOption type="swamp">
          <Obfuscate>Swamp</Obfuscate>
        </ThemeOption>
        <ThemeOption type="banana">
          <Obfuscate>Banana</Obfuscate>
        </ThemeOption>
        <ThemeOption type="flamingo">
          <Obfuscate>Flamingo</Obfuscate>
        </ThemeOption>
        <ThemeOption type="magma">
          <Obfuscate>Magma</Obfuscate>
        </ThemeOption>
        <ThemeOption type="shadow">
          <Obfuscate>Shadow</Obfuscate>
        </ThemeOption>
        <ThemeOption type="hacker">
          <Obfuscate>Hacker</Obfuscate>
        </ThemeOption>
        <ThemeOption type="nord">
          <Obfuscate>Nord</Obfuscate>
        </ThemeOption>
        <ThemeOption type="violet">
          <Obfuscate>Violet</Obfuscate>
        </ThemeOption>
        <ThemeOption type="jungle">
          <Obfuscate>Jungle</Obfuscate>
        </ThemeOption>
        <ThemeOption type="connection">
          <Obfuscate>Connection</Obfuscate>
        </ThemeOption>
        <ThemeOption type="dune">
          <Obfuscate>Dune</Obfuscate>
        </ThemeOption>
        <ThemeOption type="dracula">
          <Obfuscate>Dracula</Obfuscate>
        </ThemeOption>
        <ThemeOption type="tiktok">
          <Obfuscate>TikTok</Obfuscate>
        </ThemeOption>
        <ThemeOption type="nebelung">
          <Obfuscate>Nebelung</Obfuscate>
        </ThemeOption>
        <ThemeOption type="echo">
          <Obfuscate>3kh0</Obfuscate>
        </ThemeOption>
        <ThemeOption type="fracital">
          <Obfuscate>Fracital</Obfuscate>
        </ThemeOption>
        <ThemeOption type="simple">
          <Obfuscate>Simple</Obfuscate>
        </ThemeOption>
        <ThemeOption type="nebula">
          <Obfuscate>Nebula</Obfuscate>
        </ThemeOption>
        <ThemeOption type="tsunami">
          <Obfuscate>Tsunami</Obfuscate>
        </ThemeOption>
        { localStorage.getItem("hub") === "true"  ? (
        <ThemeOption type="hub">
          <Obfuscate>Hub</Obfuscate>
        </ThemeOption>
        ) : ""
        }
      </div>
      <div className="optiontitle">
        <Obfuscate>Background</Obfuscate>
      </div>
      <div className="chooseoption">
        <BackgroundOption type="none">None</BackgroundOption>
        <BackgroundOption type="particles">Particles</BackgroundOption>
        <BackgroundOption type="stars">Stars</BackgroundOption>
        <BackgroundOption type="blocks">Blocks</BackgroundOption>
        <BackgroundOption type="triangles">Triangles</BackgroundOption>
        <BackgroundOption type="balls">Balls</BackgroundOption>
        <BackgroundOption type="bubbles">Bubbles</BackgroundOption>
        <BackgroundOption type="sus">Sus</BackgroundOption>
      </div>
    </>
  );
}

export default Appearance;
