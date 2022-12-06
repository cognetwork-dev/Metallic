import React from "react";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";

function Support() {
  return (
    <>
      <Head defaultTitle="Credits | Metallic"></Head>
      <Nav />
      <div className="itemscontainer">
        <div className="itemsection">
          <Obfuscate>Credits</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Developers</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Nebeung - Owner and main developer</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Divide - Developer</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Proxies</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Divide - TOMP</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Caracal.js - Ultraviolet</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Divide - Stomp</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Ender - DIP</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Cohen - Osana</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>EndlessVortex - Aero</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Games</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>BinBashBanana - gfiles</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>BinBashBanana - WebRetro</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Others</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Everyone else in the TN/Fog community :)</Obfuscate>
        </div>
      </div>
    </>
  );
}

export default Support;
