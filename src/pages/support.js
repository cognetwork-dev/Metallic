import React from "react";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";

function Support() {
  return (
    <>
      <Head defaultTitle="Support | Metallic"></Head>
      <Nav />
      <div className="itemscontainer">
        <div className="itemsection">
          <Obfuscate>FAQ</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>The proxy is not loading</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>
            If you see an error page try reloading the website. If the website
            is not supported there is nothing we can do.
          </Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Where can I obtain more links to Metallic?</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>
            You can find more link on our discord here. Go to #proxy-bot and
            choose Metallic for a randomized link.
          </Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Is my information secure?</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>
            We do not collect any data from you but any website you visit can.
          </Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>How to self-host Metallic</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>
            Check out the github repository for source code and info about
            hosting.
          </Obfuscate>
        </div>
        <div className="itemsection">
          <Obfuscate>Contact</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>Email</Obfuscate>
        </div>
        <a className="link" href="mailto:nebelung@mailfence.com">
          <div className="itemtext">
            <Obfuscate>nebelung@mailfence.com</Obfuscate>
          </div>
        </a>
        <div className="itemtitle">
          <Obfuscate>Discord</Obfuscate>
        </div>
        <a className="link" href="https://discord.gg/yk33HZSZkU">
          <div className="itemtext">
            <Obfuscate>https://discord.gg/yk33HZSZkU</Obfuscate>
          </div>
        </a>
      </div>
    </>
  );
}

export default Support;
