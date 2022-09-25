import React from "react";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";
import { Link } from "react-router-dom";

function Privacy() {
  return (
    <>
      <Head defaultTitle="Privacy Policy | Metallic"></Head>
      <Nav />
      <div className="itemscontainer">
        <div className="itemsection">
          <Obfuscate>Privacy Policy</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Consent</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>
            By using our service, you agree to our Privacy Policy our use of
            information.
          </Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Information Collection</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>
            We do not collect any of your personal data. However, visiting third
            party websites using our proxy may use you data.
          </Obfuscate>
          <br />
          <Obfuscate>
            Read the privay policy from each website you visit for more info on
            how they collect your data.
          </Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Contact </Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Contact information can be found on the </Obfuscate>
          <Link className="link" to="/support.html">
            <Obfuscate>support page</Obfuscate>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Privacy;
