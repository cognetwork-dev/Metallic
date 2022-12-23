import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import particles from "../assets/backgrounds/particles.json";
import stars from "../assets/backgrounds/stars.json";
import blocks from "../assets/backgrounds/blocks.json";
import triangles from "../assets/backgrounds/triangles.json";
import balls from "../assets/backgrounds/balls.json";
import bubbles from "../assets/backgrounds/bubbles.json";
import sus from "../assets/backgrounds/sus.json";
import { useLocalBackground } from "../settings.js";

var backgrounds = {
  particles,
  stars,
  blocks,
  triangles,
  balls,
  bubbles,
  sus
};

function Background() {
  var [localBackground] = useLocalBackground();

  var realBackground =
    localBackground in backgrounds && backgrounds[localBackground];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    realBackground && (
      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{ display: realBackground ? "initial" : "none" }}
        options={realBackground}
      />
    )
  );
}

export default Background;
