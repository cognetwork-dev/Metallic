import React from "react";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";

function Games() {
  return (
    <>
      <Head defaultTitle="Games | Metallic"></Head>
      <Nav />
      <h1 className="title">
        <Obfuscate>Games - Coming Soon!</Obfuscate>
      </h1>
    </>
  );
}

export default Games;
