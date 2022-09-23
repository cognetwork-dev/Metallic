import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";

function Error() {
  return (
    <>
      <Head defaultTitle="Error | Metallic"></Head>
      <Nav />
      <div className="title">
        <Obfuscate>404 Error</Obfuscate>
      </div>
      <div className="desc">
        <Obfuscate>
          This requested page {window.location.pathname} does not exist.
        </Obfuscate>
        <br />
        <Obfuscate>Visit the </Obfuscate>
        <Link className="link" to="/support">
          <Obfuscate>support</Obfuscate>
        </Link>
        <Obfuscate> page for help.</Obfuscate>
      </div>
    </>
  );
}

export default Error;
